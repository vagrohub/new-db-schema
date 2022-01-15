import { Router } from 'express';
import {
    initNewDevice,
    pushMeasurement,
    stopCurrentExperiment,
    getDeviceDataById,
    edditDescriptionDevice
} from './controllers/device.controllers.js';
import checkingRequestsForFields from '../middlewares/checkingRequestsForFields.middleware.js';

const router = new Router();

// Получить информацию по устройству по индификатору
router.get(
    '/', 
    [
        checkingRequestsForFields('query', 'id')
    ],
    getDeviceDataById
);

// Инициализировать новое устройтсво
router.post(
    '/new',
    [
        checkingRequestsForFields('body', 'name', 'password', 'description')
    ],
    initNewDevice
);

// Завершить текущий эксперимент и начать новый
router.post(
    '/experiment',
    [
        checkingRequestsForFields('body', 'id')
    ],
    stopCurrentExperiment
);

// Изменить описание эксперимента
router.patch(
    '/description',
    [
        checkingRequestsForFields('body', 'id', 'description')
    ],
    edditDescriptionDevice
);


// Только для устройсва
// Добавить измерения в текущий экспримент
router.patch(
    '/experiment',
    [
        checkingRequestsForFields('body', 'name', 'password', 'measurement')
    ],
    pushMeasurement
);

export default router;
