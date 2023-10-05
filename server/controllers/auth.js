const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

const register = (req, res) => {
    console.log(req.body);
    const { firstname, lastname, email, password } = req.body;

    if (!email) res.status(400).send({msg: 'Email Obligatorio'})


    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false
    });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    user.save((error, userStorage) => {
        if (error) {
            res.status(400).send({ msg: 'Error al crear usuario!' })
        }else {
            res.status(200).send(userStorage);
        }
    });
}

const login = (req, res) => {

    const { email, password } = req.body;

    if (!email) res.status(400).send({msg: 'Email Obligatorio'});
    if (!password) res.status(400).send({msg: 'Password Obligatorio'});

    const emailLowerCase = email.toLowerCase();

    User.findOne({email: emailLowerCase}, (error, userStorage) => {
        if (error) {
            res.status(500).send({ msg: 'Error de servidor'})
        }else {
            bcrypt.compare(password, userStorage.password, (bcryptError, check) => {
                if (bcryptError) {
                    res.status(500).send({ msg: 'Error del servidor '})
                } else if(!check){
                    res.status(400).send({ msg: 'Las credenciales no coinciden con nuestros registros!'})
                } else if(!userStorage.active){
                    res.status(401).send({ msg: 'Usuario no activo!'})
                }else {
                    res.status(200).send({
                        access: jwt.createAccessToken(userStorage),
                        refresh: jwt.createRefreshToken(userStorage)
                    })
                }
            });
        }
    })
}

const regreshAccessToken = (req, res) => {
    const { token } = req.body;

    if(!token) res.status(400).send({msg: 'Token requerido!'})

    const { user_id } = jwt.decoded(token);

    User.findOne({_id: user_id}, (error, userStorage) => {
        if (error) {
            res.status(500).send({ msg: 'Error del servidor '})
        }else {
            res.status(200).send({
                accessToken: jwt.createAccessToken(userStorage),
            });
        }
    });

}



module.exports = {
    register,
    login,
    regreshAccessToken
}