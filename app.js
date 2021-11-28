import express from 'express';
import mongoose from 'mongoose';
import experimentRoutes from './experiment/routes.experiment.config.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/experiment', experimentRoutes);

const start = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://manulovicm:GvJgLFRGqy4myCi@cluster0.joysr.mongodb.net/new-db-schema?retryWrites=true&w=majority'
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
