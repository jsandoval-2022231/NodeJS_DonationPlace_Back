import bcryptjs from 'bcryptjs';
import User from '../../../user_service/src/model/user.model.js';
import { generateToken } from '../../utils/generate--jwt.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (user && (await bcryptjs.compare(password, user.password))) {
            const token = await generateToken(user.id)

            res.status(200).json({
                msg: "Login Ok!!!",
                userDetails: {
                    username: user.username,
                    token: token,
                    id: user.id,
                },
            });
        }

        if (!user) {
            return res
                .status(400)
                .send(`Wrong credentials, ${email} doesn't exists en database`);
        }

        // verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).send("wrong password");
        }

    } catch (e) {
        res.status(500).send("Comuniquese con el administrador");
    }
};

