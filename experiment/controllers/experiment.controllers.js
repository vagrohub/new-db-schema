import { Experiment } from '../model/experiment.model.js';
import { experimentWithSpecifiedIdNotExist } from '../utils/controllers.utils.js';

const getExperimentById = async (req, res) => {
    try {
        const experiment = await Experiment.findById(req.query.id);
        
        if (!experiment) {
            return experimentWithSpecifiedIdNotExist(req, res);
        }
        console.log(3);

        return res.status(200).send({ experiment });
    } catch (error) {
        return res.status(503).send({ error });
    }
};

const createNewExperiment = async (req, res) => {
    try {
        const experiment = new Experiment({
            title: req.body.title, description: req.body.description
        });
        await experiment.save();
        return res.status(200).send({ id: experiment._id });
    } catch (error) {
        return res.status(503).send({ error })
    }
};

const edditTitleExperiment = async (req, res) => {
    try {
        const experiment = await Experiment.findById(req.body.id);
        
        if (!experiment) {
            return experimentWithSpecifiedIdNotExist(req, res);
        }

        await experiment.edditTitle(req.body.title);
        return res.status(200).send({ experiment });
    } catch (error) {
        return res.status(503).send({ error });
    }
};

const edditDescriptionExperiment = async (req, res) => {
    try {
        const experiment = await Experiment.findById(req.body.id);
        
        if (!experiment) {
            return experimentWithSpecifiedIdNotExist(req, res);
        }

        await experiment.edditDescription(req.body.description);
        return res.status(200).send({ experiment });
    } catch (error) {
        return res.status(503).send({ error });
    }
};

const pushMeasurementExperiment = async (req, res) => {
    try {
        const experiment = await Experiment.findById(req.body.id);
        
        if (!experiment) {
            return experimentWithSpecifiedIdNotExist(req, res);
        }

        await experiment.pushMeasurement(req.body.measurement);
        return res.status(200).send({ experiment });
    } catch (error) {
        return res.status(503).send({ error });
    }
};

export {
    getExperimentById,
    createNewExperiment,
    edditTitleExperiment,
    edditDescriptionExperiment,
    pushMeasurementExperiment,
}