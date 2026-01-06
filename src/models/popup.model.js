const mongoose = require("mongoose");

const popupSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    linkUrl: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    startDate: { type: Date },
    endDate: { type: Date },
    order: { type: Number, default: 0 },
    width: { type: Number, default: 400 },
    positionX: { type: Number, default: 20 },
    positionY: { type: Number, default: 20 },
    createdAt: { type: Date, default: Date.now }
});

const Popup = mongoose.model("popup", popupSchema);

module.exports = Popup;
