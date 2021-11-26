import { Router } from 'express';
import { Device } from './models/model.device.js';

const router = Router();

router.get('/create-device', async (req, res) => {
    const device = await Device.findOne({ name: 'testName', password: 'testPassword' });
    await device.pushDataInCurrentMeasurements({
        danger: false,
        tempRoom: 26.7,
        tempWater: 20.1,
        lightSensor: 812,
        lightWorkingTime: 11,
        lightOffTime: Date.now(),
        pumpTime: 123,
        pumpSleep: 121
    });
    res.status(200).send();
});

export default router;