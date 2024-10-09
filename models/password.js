const mongoose = require('mongoose');

const PasswordSchema = new mongoose.Schema({
    website: { type: String, required: true },
    password: { type: String, required: true },
});

const passwordModel = mongoose.model("passModel", PasswordSchema);

module.exports = passwordModel;