const Router = require("express")
const router = new Router()
const roleMiddleware = require("../middlewares/roleMiddleware")
const deviceController = require("../controllers/deviceController")

router.post("/",roleMiddleware("ADMIN"),deviceController.create)
router.get("/",deviceController.getAll)
router.get("/:id",deviceController.getOne)


module.exports = router