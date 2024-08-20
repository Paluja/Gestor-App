const userData = require("../../services/dao/userDao");
const { SignJWT, jwtVerify } = require('jose');
const md5 = require('md5');


const userToken = async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).send('Name and password required');
    }

    try {
        const { id_users} = await userData.login(name, password);
        // console.log('name:', name, 'password:', password);
        if (!id_users) {
            return res.status(401).send('Invalid credentials');
        }
        const jwtConstructor = new SignJWT({id_users: id_users.toString()});
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


const authUser = async(req,res) =>{
    const token = req.headers.authorization;
    if (!token) return res.sendStatus(401);
    try {
        const encoder = new TextEncoder();
        const { payload }  = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_SECRET)
        );
        
        const user = await userData.getUserById(payload.id_users);
        if (!user) return res.sendStatus(401);
        delete user.passwd;
        return res.status(200).send(user);
    } catch (error) {
        return res.sendStatus(401);
    }
}

const registerUser = async (req, res) => {
    const { name, password ,id_admin} = req.body;
    const token = req.headers.authorization;
    if (!token) return res.sendStatus(401);
    if (!name || !password || id_admin) return res.status(400).send('Name, password and admin that created, required');
    try {
        const encoder = new TextEncoder();
        const { payload }  = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_SECRET)
        );
        const hashedPassword = md5(password);
        const newUser = { name:name, passwd: hashedPassword,id_admin:payload.id_admin };
        await userData.insertUser(newUser);
        console.log('User registered successfully');
        return res.status(200).json({message: 'User registered successfully'});
    } catch (error) {
        console.error('Error registering admin:', error);
        return res.status(500).send('Internal server error');
    }
}


module.exports = {registerUser, authUser, userToken}


