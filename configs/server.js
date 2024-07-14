'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import bcrypt from 'bcryptjs';
import User from '../user_service/src/model/user.model.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

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
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
        });
    }
}

export default Server;