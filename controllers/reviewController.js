const { Review} = require("../models/models")

class BasketController {
    async getAll (req,res) {
        const {deviceId} = req.body
        const allReviews = await Review.findAll({where:{deviceId}})
        return res.json(allReviews)
    }
    async create(req,res) {
        const {deviceId,userId,comment,name,rate} = req.body
        const createdReview = await Review.create({deviceId,userId,name,comment,rate})
        return res.json(createdReview)
    }
}

module.exports = new BasketController()