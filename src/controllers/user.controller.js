const db = require("../models");

const { user : User } = db;

exports.login = async (req, res) => {
    const { id, password } = req.body
    await User.findOne({ id })
        .then(result => {
            if(!result){
                return res.json({ message : 'InvaildID' })
            }
            if(result.password === password){
                return res.status(200).json({ message : 'Success' })
            }
            if(result.password !== password){
                return res.json({ message : 'InvaildPassword' })
            }
        })
        .catch(err => res.json(err.message))
}