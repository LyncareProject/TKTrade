const db = require("../models");
const { popup: Popup } = db;

// 팝업 생성
exports.create = async (req, res) => {
    const popup = new Popup(req.body);
    await popup.save()
        .then(() => {
            res.status(200).json({ message: "Success" });
        })
        .catch(err => res.json(err));
};

// 단일 팝업 조회
exports.read = async (req, res) => {
    const { _id } = req.body;
    await Popup.findOne({ _id })
        .then(result => res.json(result))
        .catch(err => console.log(err.message));
};

// 팝업 수정
exports.update = async (req, res) => {
    const { _id } = req.body;
    await Popup.findOneAndUpdate({ _id }, req.body)
        .then(result => res.json({ message: "Success" }))
        .catch(err => console.log(err.message));
};

// 팝업 삭제
exports.delete = async (req, res) => {
    const _id = req.params.id;
    await Popup.deleteOne({ _id })
        .then(result => res.json({ message: "Success" }))
        .catch(err => console.log(err.message));
};

// 전체 팝업 조회 (관리자용)
exports.findAll = async (req, res) => {
    await Popup.find().sort({ order: 1, createdAt: -1 })
        .then(result => res.json(result))
        .catch(err => res.json(err));
};

// 활성화된 팝업만 조회 (프론트엔드용)
exports.findActive = async (req, res) => {
    const now = new Date();
    await Popup.find({
        isActive: true,
        $or: [
            { startDate: { $exists: false }, endDate: { $exists: false } },
            { startDate: { $lte: now }, endDate: { $gte: now } },
            { startDate: { $lte: now }, endDate: { $exists: false } },
            { startDate: { $exists: false }, endDate: { $gte: now } }
        ]
    }).sort({ order: 1 })
        .then(result => res.json(result))
        .catch(err => res.json(err));
};
