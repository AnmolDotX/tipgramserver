const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, resp, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return resp.json({ msg: "Username already used", status: false });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return resp.json({ msg: "Email already exists", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    delete user.password;
    return resp.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, resp, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return resp.json({
        msg: "Incorrect username",
        status: false,
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return resp.json({
        msg: "Incorrect password",
        status: false,
      });
    delete user.password;
    return resp.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.getContactUsers = async (req, res, next) => {
  try {
    const currentUserId = req.params.id;

    const contacts = await User.aggregate([
      {
        $match: {
          _id: { $ne: new mongoose.Types.ObjectId(currentUserId) }
        }
      },
      {
        $lookup: {
          from: "messages",
          let: { contactId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: [
                        {
                          $size: {
                            $setIntersection: [
                              "$users",
                              [new mongoose.Types.ObjectId(currentUserId), "$$contactId"]
                            ]
                          }
                        },
                        2
                      ]
                    }
                  ]
                }
              }
            },
            { $sort: { createdAt: -1 } },
            { $limit: 1 },
            {
              $project: {
                text: "$message.text",
                createdAt: 1,
                read: 1
              }
            }
          ],
          as: "lastMessage"
        }
      },
      {
        $lookup: {
          from: "messages",
          let: { contactId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$sender", "$$contactId"] },
                    { $in: [new mongoose.Types.ObjectId(currentUserId), "$users"] },
                    { $eq: ["$read", false] }
                  ]
                }
              }
            },
            { $count: "count" }
          ],
          as: "unreadMessages"
        }
      },
      {
        $project: {
          username: 1,
          email: 1,
          avatarImage: 1,
          lastMessage: {
            $ifNull: [{ $arrayElemAt: ["$lastMessage", 0] }, null]
          },
          unreadCount: {
            $ifNull: [{ $arrayElemAt: ["$unreadMessages.count", 0] }, 0]
          }
        }
      }
    ]);

    res.json({ status: true, contacts });
  } catch (error) {
    next(error);
  }
};