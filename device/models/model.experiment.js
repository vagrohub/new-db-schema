import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const experimentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    measurements: [{
        type: Schema.Types.ObjectId,
        ref: 'Measurements'
    }]
});

const Experiment = model('Experiment', experimentSchema);

export {
    Experiment
}