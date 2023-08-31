const express = require('express');

const router = express.Router();

const controller = require("../controllers/pdf.controller");

const multer = require('multer');

const path = require('path');

// const upload = multer({ dest: 'uploads/' }); 
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); // 업로드된 파일의 저장 경로
        },
        filename: (req, file, cb) => {
            // const extname = path.extname(file.originalname);
            // const filename = path.basename(file.originalname, extname);
            cb(null, `${Date.now()}.pdf`); // 파일명 설정
        }
    }),
});

router.post("/", upload.single('pdfFile'), controller.create);
router.delete('/:filename', controller.delete)

module.exports = router;