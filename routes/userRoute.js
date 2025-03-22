const { register, login, getContactUsers } = require("../controller/userContoller")
const cors = require('cors')

const router = require("express").Router()
router.use(cors())

router.post('/register', register)
router.post('/login', login)
router.get('/contactUsers/:id', getContactUsers)

router.get('/', (req, res) => {
    res.status(200).send("<h1>server connected</h1>")
})

module.exports = router;