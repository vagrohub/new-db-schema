import Device from '../model/device.model.js';
import { bcryptSaltRounds } from '../../app.config.js';
import { createNewExperiment, excludeSensitiveData } from '../utils/controllers.utils.js';
import bcrypt from 'bcrypt';

const initNewDevice = async (req, res) => {
    try {
        let condidate = await Device.findOne({
            name: req.body.name
        });

        if (condidate) {
            return res.status(400).send({
                error: `A device named ${req.body.name} already exists`
            });
        }

        let id = await createNewExperiment();

        condidate = new Device({
            name: req.body.name,
            password: bcrypt.hashSync(
                req.body.password,
                bcryptSaltRounds
            ),
            description: req.body.description || '',
            currentExperiment: id
        });

        await condidate.save();
        return res.send({ id: condidate.id });
    } catch (error) {
        return res.status(503).send({ error: error.message });     
    }
};

const pushMeasurement = async (req, res) => {
    try {
        const device = await Device
            .findOne({
                name: req.body.name
            })
            .populate([{
                path: 'currentExperiment',
                model: 'Experiment'
            }]);

        if (!device) {
            return res.status(400).send({
                error: `Device is not init`
            });
        }

        if (!bcrypt.compareSync(req.body.password, device.password)) {
            return res.status(400).send({
                error: `Login and password do not match`
            });
        }

        await device.currentExperiment
            .pushMeasurement(req.body.measurement);

        return res.send({ status: true });
    } catch (error) {
        return res.status(503).send({ error: error.message });
    }
};

const stopCurrentExperiment = async (req, res) => {
    try {
        const device = await Device.findById(req.body.id);

        if (!device) {
            return res.status(400).send({
                error: `Device is not init`
            });
        }

        const newId = await createNewExperiment();

        await device.stopCurrentExperiment(newId);
        return res.send({ status: true });
    } catch (error) {
        return res
            .status(503)
            .send({ error: error.message });
    }
};

const getDeviceDataById = async (req, res) => {
    try {
        const device = await Device.findById(req.query.id);

        if (!device) {
            return res.status(400).send({
                error: `Device is not init`
            });
        }

        return res.send({
            device: excludeSensitiveData(device)
        });
    } catch {
        return res
            .status(503)
            .send({ error: error.message });
    }
};

const edditDescriptionDevice = async (req, res) => {
    try {
        const device = await Device.findById(req.body.id);

        if (!device) {
            return res.status(400).send({
                error: `Device is not init`
            });
        }

        await device.edditDescription(req.body.description);
        return res.send({
            description: req.body.description
        });
    } catch (error) {
        return res
            .status(503)
            .send({ error: error.message });
    }
}

export {
    initNewDevice,
    pushMeasurement,
    stopCurrentExperiment,
    getDeviceDataById,
    edditDescriptionDevice
}