const ApiError = require("../error/apiError")
const { Op } = require("sequelize");
const uuid = require("uuid")
const path = require("path")
const {Device,DeviceInfo} = require("../models/models")
class DeviceController {
    async create (req,res,next) {
        try{ 
            let {name,price,typeId,brandId,info} = req.body;
            const {img} = req.files
            let fileName = uuid.v4() + ".webp"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName});
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll (req,res,next) {
        try{
            let {brandId,typeId,limit,page,search} = req.query;
            page = page || 1;
            limit = limit || 1;
            let offset = page * limit - limit
            let devices;
            if(!brandId && !typeId) {
                devices = await Device.findAndCountAll({where:{name:{
                    [Op.substring]:`%${search}%`
                }},limit,offset})
            }
            
            if(!brandId && typeId) {
                devices = await Device.findAndCountAll({where:{typeId,name:{
                    [Op.substring]:`%${search}%`
                }},limit,offset})
            }
            if(brandId && !typeId) {
                devices = await Device.findAndCountAll({where:{brandId,name:{
                    [Op.substring]:`%${search}%`
                }},limit,offset})
            }
            if(brandId && typeId) {
                devices = await Device.findAndCountAll({where:{typeId,brandId,name:{
                    [Op.substring]:`%${search}%`
                }},limit,offset})
            }
            return res.json(devices)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getOne (req,res,next) {
       try {
        const { id } = req.params;
        const device = await Device.findOne({
            where:{id},
            include:[{model:DeviceInfo,as:"info"}]
        })
        return res.json(device)
       } catch (error) {
        next(ApiError.badRequest(e.message))
       }

    }

}

module.exports = new DeviceController()