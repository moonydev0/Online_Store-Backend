const Router = require("express")
const roleMiddleware = require("../middlewares/roleMiddleware")
const BrandController = require("../controllers/brandController")
const router = new Router()


router.post("/",roleMiddleware("ADMIN"),BrandController.create)
router.get("/",BrandController.getAll)


module.exports = router