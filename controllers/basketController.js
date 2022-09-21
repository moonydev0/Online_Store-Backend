const {BasketDevice} = require("../models/models")

class BasketController {
    async get (req,res) {
        const {basketId} = req.body
        const devices = await BasketDevice.findAll({where:{basketId}})
        return res.json(devices)
    }
    async add(req,res) {
        const {basketId,deviceId} = req.body
        const addedDevice = await BasketDevice.create({basketId,deviceId})
        return res.json(addedDevice)
    }
    async remove(req,res) {
        const {deviceId,basketId} = req.body
        const deletedDevice = await BasketDevice.destroy({where:{deviceId,basketId}})
        return res.json(deletedDevice)
    }
    async update (req,res) {
        const {count,basketId,deviceId} = req.body
        const device = await BasketDevice.findOne({where:{basketId,deviceId}})
        const updated = await device.update({amount:count})
        return res.json(updated)
    }
}

module.exports = new BasketController()