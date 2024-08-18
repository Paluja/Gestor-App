const userData = require("../../services/dao/userDao");

const getAllUsers = async (req, res) => {
    try {
        const users = await userData.getUsers();
        return res.status(200).send(users);
    } catch (error) {
        console.error('Error getAllUsers:', error);
        return res.status(500).send('Internal server error');
    }
}

module.exports = { getAllUsers };