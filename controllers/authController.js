const User = require('../models/User');
const bcrypt = require('bcryptjs');

class AuthController {
    async registerUser(req, res) {
        try{
            const {username, email, password} = req.body;

            console.log({username, email, password});

            let user = await User.findOne({email});

            if (user){
                return res.status(400).json({message: "User with this email already exist"});
            }

            const hashedPassword = await bcrypt.hash(password, 7);
            user = new User({username, email, hashedPassword});
            await user.save();

            return res.status(201).json(user);
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }

    async loginUser(req, res){
        try{
            const {email, password} = req.body;
            console.log(email, password);

            const foundUser = await User.findOne({email});

            if (!foundUser){
                return res.status(404).json({message: "User with this email does not exist"});
            }
            
            const isPasswordCorrect = await bcrypt.compare(password, foundUser.hashedPassword);
            
            if (!isPasswordCorrect){
                return res.status(400).json({message: "Incorrect password"});
            }

            req.session.isAuth = true;
            return res.status(200).json(req.session);

        }catch(error){  
            return res.status(500).json({message: error.message});
        }
    }
}

module.exports = AuthController;