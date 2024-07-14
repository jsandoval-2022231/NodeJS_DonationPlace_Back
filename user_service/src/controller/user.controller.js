import UserModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import createController from "../../../http_service/src/http.service.js";

const customPostLogic = async (req, res) => {
    const { name, email, password, address, phone } = req.body;
    const passwordHash = await bcrypt.hash(password, 3);
    const user = new UserModel({
        name,
        email,
        password: passwordHash,
        address,
        phone,
    });
    await user.save();
    return { user };
}

const userController = createController(UserModel, customPostLogic);

export const post = userController.post;
export const getAll = userController.getAll;
export const getOne = userController.getOne;
export const update = userController.update;
export const remove = userController.remove;

