'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import bcrypt from 'bcryptjs';
import User from '../user_service/src/model/user.model.js';
import Item from '../item_service/src/model/item.model.js';

import ItemRoutes from '../item_service/src/route/item.routes.js';
import AuthRoutes from '../auth_service/src/route/auth.routes.js';
import UserRoutes from '../user_service/src/route/user.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/DonationPlace/v1/user';
        this.authPath = '/DonationPlace/v1/auth';
        this.itemPath = '/DonationPlace/v1/item';

        this.conectarDB();
        this.createDefaultAdmin();
        this.middlewares();
        this.routes();
    }

    async createDefaultAdmin() {
        const adminEmail = 'admin@gmail.com';
        const admin = await User.findOne({ email: adminEmail });
        if (!admin) {
            const hashedPassword = await bcrypt.hash('ADMINB', 10);
            const defaultAdmin = new User({
                name: 'ADMINB',
                email: adminEmail,
                password: hashedPassword,
                address: 'Admin Address',
                phone: '12345678',
                role: 'ADMIN',
                joinDate: new Date(),
                ratings: 100
            });
            await defaultAdmin.save();
            console.log('Default admin user created');
        } else {
            console.log('Admin user already exists');
        }
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.userPath, UserRoutes);
        this.app.use(this.authPath, AuthRoutes);
        this.app.use(this.itemPath, ItemRoutes);
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
        });
    }
}

export default Server;