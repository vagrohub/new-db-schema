import { Router } from 'express';
import checkingRequestsForFields from '../middlewares/checkingRequestsForFields.middleware.js';
import {
    getExperimentById,
    createNewExperiment,
    edditTitleExperiment,
    edditDescriptionExperiment,
    pushMeasurementExperiment
} from './controllers/experiment.controllers.js';


const router = Router();


// Получить эксперимент по индифиатору
router.get(
    '/',
    [
        checkingRequestsForFields('query', 'id')
    ],
    getExperimentById
);

// Создать новый экспреимент
router.post(
    '/new',
    [
        checkingRequestsForFields('body', 'title', 'description')
    ],
    createNewExperiment
);

// Добавить измерения в текущий экспримент
router.patch(
    '/measurement',
    [
        checkingRequestsForFields('body', 'id', 'measurement')
    ],
    pushMeasurementExperiment
);

// Изменить название эксперимента
router.patch(
    '/title',
    [
        checkingRequestsForFields('body', 'id', 'title')
    ],
    edditTitleExperiment
);

// Изменить описание эксперимента
router.patch(
    '/description',
    [
        checkingRequestsForFields('body', 'id', 'description')
    ],
    edditDescriptionExperiment
);

export default router;