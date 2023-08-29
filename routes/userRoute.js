const {register, login} = require("../controller/userContoller")
const cors = require('cors')

const router = require("express").Router()
router.use(cors())

router.post('/register',register)
router.post('/login',login)

router.get('/register',(req,res)=>{
    res.status(200).send("server connected")
})

module.exports = router;