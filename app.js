import express from 'express';
import mongoose from 'mongoose';
import experimentRoutes from './experiment/routes.experiment.config.js';
import deviceRoutes from './device/routes.device.config.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/experiment', experimentRoutes);
app.use('/device', deviceRoutes);

const start = async () => {
    try {
        await mongoose.connect(
            'mongodb://192.168.6.21:27017'
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
