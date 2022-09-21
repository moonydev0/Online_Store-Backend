const Router = require("express")
const roleMiddleware = require("../middlewares/roleMiddleware")
const typeController = require("../controllers/typeController")
const router = new Router()

router.post("/",roleMiddleware("ADMIN"),typeController.create)
router.get("/",typeController.getAll)

module.exports = router