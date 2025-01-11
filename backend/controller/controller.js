const User = require('../model/user-model.js')

const createUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const newUser = new User({ username, password })
        const save = await newUser.save()
        console.log(save)

        res.statsu(200).json({message:'user created successfully'})
    } catch (error) {
        console.log(error)
    }
}

const Login = async(req,res) => {
    const {username,password} = req.body
    console.log(username,password)
    try {
        const find = await User.findOne({password})

        if(find){
            res.status(200).json({message: 'success'})
        } else {
            res.status(404).json({message:'failed'})
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = { createUser,Login }