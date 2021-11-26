import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const measurementsSchema = new Schema({
    danger: Boolean,
    tempRoom: Number,
    tempWater: Number,
    lightSensor: Number,
    lightWorkingTime: Number,
    lightOffTime: Date,
    pumpTime: Number,
    pumpSleep: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

const Measurements = model('Measurements', measurementsSchema);

export {
    Measurements
}