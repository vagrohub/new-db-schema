import { Router } from 'express';
import {
    getExperimentById,
    createNewExperiment,
    edditTitleExperiment,
    edditDescriptionExperiment,
    pushMeasurementExperiment
} from './controllers/experiment.controllers.js';


const router = Router();

router.get('/', getExperimentById);
router.post('/new', createNewExperiment);
router.patch('/measurement', pushMeasurementExperiment);
router.patch('/title', edditTitleExperiment);
router.patch('/description', edditDescriptionExperiment);


export default router;