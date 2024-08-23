const adminData = require('../../services/dao/adminDao');
const { SignJWT, jwtVerify } = require('jose');
const md5 = require('md5');
let revokedTokens = [];

const adminToken = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password required');
    }

    try {
        console.log('email:', email, 'password:', password);
        const { id_admin } = await adminData.login(email, md5(password));
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
    if (!token) return res.sendStatus(401);
    if (revokedTokens.includes(token)) return res.sendStatus(401);
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
        return res.status(200).json({message: 'Admin registered successfully'});
    } catch (error) {
        console.error('Error registering admin:', error);
        return res.status(500).send('Internal server error');
    }
}

const logoutAdmin = (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(400).send('Token required');

    revokedTokens.push(token);
    return res.status(200).send('Logged out successfully');
};


module.exports = { adminToken, authAdmin, registerAdmin,logoutAdmin };