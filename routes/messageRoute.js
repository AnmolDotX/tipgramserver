const { addMessages, getAllMessages } = require("../controller/messageController")
const cors = require('cors')

const router = require("express").Router()
router.use(cors())

router.post('/addmsg',addMessages)
router.post('/getallmsg',getAllMessages)





module.exports = router;