const { default: mongoose } = require("mongoose");
const messageModel = require("../models/messageModel");

module.exports.addMessages = async (req, resp, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    });
    if (data)
      return resp.json({
        msg: "Message added succesfully to Database",
      });
    return resp.json({
      msg: "Failed to add message to Database",
    });
  } catch (error) {
    next(error.message);
  }
};

module.exports.getAllMessages = async (req, resp, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({
        updatedAt: 1,
      });

    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    resp.json(projectMessages)
  } catch (error) {
    next(error.message);
  }
};


module.exports.markAsRead = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    await messageModel.updateMany(
      {
        sender: new mongoose.Types.ObjectId(from),
        users: {
          $all: [
            new mongoose.Types.ObjectId(to),
            new mongoose.Types.ObjectId(from)
          ]
        },
        read: false
      },
      { $set: { read: true } }
    );

    res.json({ status: true });
  } catch (error) {
    next(error);
  }
};
