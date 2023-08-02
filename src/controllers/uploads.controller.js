const path = require('path');
const fs = require('fs');

exports.create = async (req, res) => {
    return res.json(req.file.path)
}
exports.delete = async (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../../uploads', filename);
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.send({ message : 'Deleted'});
    });
}
