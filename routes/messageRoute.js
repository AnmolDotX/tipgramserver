const { addMessages, getAllMessages, markAsRead } = require("../controller/messageController")
const cors = require('cors')

const router = require("express").Router()
router.use(cors())

router.post('/addmsg', addMessages)
router.post('/getallmsg', getAllMessages)
router.post('/markAsRead', markAsRead)





module.exports = router;