import fetch from 'node-fetch';
import { url } from '../../app.config.js';

const createNewExperiment = async (
    title = 'Новый эксперимент',
    description = `Создан автоматически ${new Date().toString()}`
) => {
     let response = await fetch(
        `${url}/experiment/new`,
        {
            method: 'POST',
            body: JSON.stringify({
                title,
                description
            }),
            headers: { 'Content-Type': 'application/json' }
        }
    );
    
    if (!response.ok) {
        throw new Error('Failed to create new experiment');
    }

    let { id } = await response.json();

    return id;
};

const excludeSensitiveData = (device) => {
    return {
        name: device.name,
        description: device.description,
        cycles: device.cycles,
        currentExperiment: device.currentExperiment
    }
};

export {
    createNewExperiment,
    excludeSensitiveData
};