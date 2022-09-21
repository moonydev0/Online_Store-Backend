const Router = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const userController = require("../controllers/userController")
const router = new Router()

router.post("/login",userController.login)
router.post("/registration",userController.registrate)
router.get("/auth",authMiddleware,userController.check)


module.exports = router