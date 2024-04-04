const userModel = require("../models/user.model");
const dummyUserData = require("../db/data");

async function seedUser(req, res, next) {
    try {
        const user = await userModel.create(dummyUserData);
        res.status(201).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = seedUser;
