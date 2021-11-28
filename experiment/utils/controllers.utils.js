export const experimentWithSpecifiedIdNotExist = (req, res) => {
    return res.status(404).send({
        error: new Error(`${req.body.id} not found`)
    });
};