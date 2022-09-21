const Router = require("express")
const basketController = require("../controllers/basketController")
const router = new Router()

router.post("/get",basketController.get)
router.post("/add",basketController.add)
router.post("/delete",basketController.remove)
router.post("/update",basketController.update)


module.exports = router