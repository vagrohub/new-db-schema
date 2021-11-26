import mongoose from 'mongoose';
import { Experiment } from './model.experiment.js';
import { Measurements } from './model.measurements.js';

const { model, Schema } = mongoose;

const deviceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Device'
    },
    cycles: [{
        type: Schema.Types.ObjectId,
        ref: 'Experiment'
    }],
    currentExperiment: {
        type: Schema.Types.ObjectId,
        ref: 'Experiment'
    }
});

deviceSchema.methods.getCycles = async function() {
    const device = await this
        .populate([{
            path:'cycles',
            model:'Experiment',
            populate:{
                model:'Measurements',
                path:'measurements'
            }
        }]);
    return device.cycles;
}
deviceSchema.methods.getCurrentExperiment = async function() {
    const device = await this
        .populate([{
            path:'currentExperiment',
            model:'Experiment',
            populate:{
                model:'Measurements',
                path:'measurements'
            }
        }]);
    return device.currentExperiment;
}
deviceSchema.methods.pushDataInCurrentMeasurements = async function(data) {
    const currentExperiment = await this.getCurrentExperiment();
    const measurements = new Measurements(data);
    console.log(currentExperiment);
    currentExperiment.measurements.push(measurements);
    measurements.save();
    currentExperiment.save();
}
deviceSchema.methods.pushExperimentInCycles = async function(experiment) {
    this.cycles.push(experiment);
    return true;
}
deviceSchema.methods.initNewExperiment = async function(title, description) {
    const currentExperiment = this.getCurrentExperiment();
    const experiment = new Experiment({ title, description });
    
    if (currentExperiment) {
        this.pushExperimentInCycles(currentExperiment);
    }

    this.currentExperiment = experiment._id;
    await experiment.save();
    await this.save();
}

const Device = model('Device', deviceSchema)

export {
    Device
}