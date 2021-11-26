import express from 'express';
import mongoose from 'mongoose';
import deviceRoutes from './device/routes.config.device.js';

const app = express();

app.use('/device', deviceRoutes);

const start = async () => {
    try {
        await mongoose.connect(
            'you mongodb address'
        );
        app.listen(
            3000,
            () => {
                console.log('server started');
            }
        );
    } catch (err) {
        console.log(err);
    }
};

start();
