const User = require('../model/user');
const bcrypt = require('bcrypt');

const storeNewUser = async (req, res) => {
    console.log(req);
    const {username, password, name} = req.body;

    try {
        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: username,
            password: encryptedPassword,
            name: name
        })

        return res.status(201).json(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const getUserById = async (req, res) => {
    const {index} = req.params;

    try {
        const user = User.findByPk(index);

        if (!user) return res.status(404).json({error: 'User not Found'});

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

const deleteUser = async(req, res) => {
    const {index} = req.params;
    try {
        const user = User.findByPk(index);

        if (!user) return res.status(404).json({error: 'User not Found'});

        await User.destroy({
            where: {id: index}
        });

        res.json({message: 'User account deleted sucessfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});       
    }
}

module.exports = {storeNewUser, getUserById, deleteUser};