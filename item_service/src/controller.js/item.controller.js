import ItemModel from '../model/item.model.js';
import UserModel from '../../user_service/src/model/user.model.js';
import createController from '../../../http_service/src/http.service.js';

const custumPostLogic = async (req, res) => {
    const user = req.user.id;
    const { title, description, category, condition, img } = req.body;
    const item = new ItemModel({
        title,
        description,
        category,
        condition,
        img,
        user
    });
    await item.save();
    res.status(201).json({
        msg: "Item created",
        item
    });
}

const itemController = createController(ItemModel, custumPostLogic);

export const post = itemController.post;
export const getAll = itemController.getAll;
export const getOne = itemController.getOne;
export const update = itemController.update;
export const remove = itemController.remove;

