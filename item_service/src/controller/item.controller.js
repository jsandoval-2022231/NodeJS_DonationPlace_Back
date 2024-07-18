import ItemModel from '../model/item.model.js';
import createController from '../../../http_service/src/http.service.js';

const custumPostLogic = async (req, res) => {
    const user = req.user;
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
        item,
        user: req.user
    });
}

export const insertProduct = async (req, res) => {
    const userito= req.user;
    const { title, description, category, condition, img } = req.body;
    const item = new ItemModel({
        title,
        description,
        category,
        condition,
        img,
        user: userito.uid
    });

    await item.save();

    res.status(200).json({
        msg: "Item created",
        item,
    });


}

export const addComment = async (req, res, next) => {
    const autor = req.user;
    const { text } = req.body;
    try {
        const postComment = await ItemModel.findByIdAndUpdate(req.params.id, {
            $push: { 
                comments: { 
                    user: autor.uid, 
                    text 
                } 
            }
        }, { new: true });

        if (!postComment) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        res.status(200).json({
            success: true,
            post: postComment
        });
    } catch (error) {
        next(error);
    }
};

const itemController = createController(ItemModel, custumPostLogic);

export const post = itemController.post;
export const getAll = itemController.getAll;
export const getOne = itemController.getOne;
export const update = itemController.update;
export const remove = itemController.remove;

