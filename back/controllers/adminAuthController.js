const adminData = require('../services/dao/adminDao');
const { SignJWT, jwtVerify } = require('jose');
const md5 = require('md5');
let admin = [];

const adminToken = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password required');
    }

    try {
        const { id_admin } = await adminData.login(email, password);
        if (!id_admin) {
            return res.status(401).send('Invalid credentials');
        }
        const jwtConstructor = new SignJWT({id_admin: id_admin.toString()});
        const encoder = new TextEncoder();

        const jwt = await jwtConstructor
            .setProtectedHeader({alg: 'HS256',typ: 'JWT'})
            .setIssuedAt()
            .setExpirationTime('48h')
            .sign(encoder.encode(process.env.JWT_SECRET));
        return res.status(200).send({jwt});
    } catch (error) {
        console.error('Error generating JWT:', error)
        return res.status(500).send('Internal server error');
    }
}


const authAdmin = async(req,res) =>{
    const token = req.headers.authorization;
    console.log(token);
    if (!token) return res.sendStatus(401);
    try {
        const encoder = new TextEncoder();
        const { payload }  = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_SECRET)
        );
        const admin = await adminData.getAdminById(payload.id_admin);
        if (!admin) return res.sendStatus(401);
        delete admin.passwd;
        return res.status(200).send(admin);
    } catch (error) {
        return res.sendStatus(401);
    }
}

const registerAdmin = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) return res.status(400).send('Email, password and name required');
    try {
        const hashedPassword = md5(password);
        const newAdmin = { email:email, passwd: hashedPassword, name:name };
        await adminData.insertAdmin(newAdmin);
        console.log('Admin registered successfully');
        return res.status(200);
    } catch (error) {
        console.error('Error registering admin:', error);
        return res.status(500).send('Internal server error');
    }
}


module.exports = { adminToken, authAdmin, registerAdmin };