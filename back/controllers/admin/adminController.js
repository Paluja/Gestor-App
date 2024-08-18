const adminData = require('../../services/dao/adminDao');

const getAllAdmins = async (req, res) => {
    try {
        const admins = await adminData.getAdmins();
        return res.status(200).send(admins);
    } catch (error) {
        console.error('Error getAllAdmins:', error);
        return res.status(500).send('Internal server error');
    }
}

module.exports = { getAllAdmins };