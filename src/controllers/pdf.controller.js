const path = require('path');
const fs = require('fs');

exports.create = async (req, res) => {
    console.log("PDF")
    console.log(req.file.path)
    return res.json(req.file.path)
}
exports.delete = async (req, res) => {
    const filename = req.params.filename;
    const pdfPath = path.join(__dirname, '../../uploads', filename);
    fs.unlink(pdfPath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.send({ message : 'Deleted'});
    });
}
