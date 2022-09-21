const Router = require("express")
const reviewController = require("../controllers/reviewController")
const router = new Router()

router.post("/getAll",reviewController.getAll)
router.post("/create",reviewController.create)


module.exports = router