const User = require('../model/user-model.js')
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const newUser = new User({ email, password })
        const save = await newUser.save()
        console.log(save)

        res.status(200).json({ message: 'user created successfully' })
    } catch (error) {
        console.log(error)
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    try {
        const find = await User.findOne({ password })
        console.log("useri id:", find._id)
        if (find) {
            const token = jwt.sign({ userId: find._id }, "romnickpogi", { expiresIn: '1d' })
            // console.log(token)
            res.cookie("token", token, {
                // withCredentials: true,
                httpOnly: true,   // ✅ Prevents JavaScript access (for security)
                secure: false,
                sameSite: "Lax",
            })
            res.status(200).json({ message: 'success' })
        } else {
            res.status(404).json({ message: 'failed' })
        }

    } catch (error) {
        console.log(error)
    }
}

const signInWithGoogle = async (req, res) => {
    const { user } = req.body
    // console.log(user)
    try {
        const findUser = await User.findOne({ uid: user.user.uid })
        console.log(findUser)

        if (!findUser) {
            const newUser = new User({ uid: user.user.uid, email: user.user.email, name: user.user.displayName, authProvider: "google" })
            const save = await newUser.save()
            // console.log(save)
            const token = jwt.sign({ userId: save._id }, "romnickpogi", { expiresIn: '1d' })
            console.log(token)
            res.cookie("token", token, {
                httpOnly: true,   // ✅ Prevents JavaScript access (for security)
                secure: true,    // ✅ Set to true in production with HTTPS
                sameSite: "None", // ✅ Required for cross-origin requests
            })
            res.json({ message: "Login successful", token });
            return;
        }

        const token = jwt.sign({ userId: findUser._id }, "romnickpogi", { expiresIn: '1d' })
        console.log(token)
        res.cookie("token", token, {
            httpOnly: true,   // ✅ Prevents JavaScript access (for security)
            secure: true,    // ✅ Set to true in production with HTTPS
            sameSite: "None", // ✅ Required for cross-origin requests
        })
        res.json({ message: "Login successful", token });
    } catch (error) {
        console.log(error)
    }
}

// sign in with facebook
const signInWithFaceBook = async (req, res) => {
    const { user } = req.body
    // console.log(user)
    try {
        const findUser = await User.findOne({ uid: user.user.uid })
        console.log(findUser)

        if (!findUser) {
            const newUser = new User({ uid: user.user.uid, email: user.user.email, name: user.user.displayName, authProvider: "facebook" })
            const save = await newUser.save()
            // console.log(save)
            const token = jwt.sign({ userId: save._id }, "romnickpogi", { expiresIn: '1d' })
            console.log(token)
            res.cookie("token", token, {
                httpOnly: true,   // ✅ Prevents JavaScript access (for security)
                secure: true,    // ✅ Set to true in production with HTTPS
                sameSite: "None", // ✅ Required for cross-origin requests
            })
            res.json({ message: "Login successful", token });
            return;
        }

        const token = jwt.sign({ userId: findUser._id }, "romnickpogi", { expiresIn: '1d' })
        console.log(token)
        res.cookie("token", token, {
            httpOnly: true,   // ✅ Prevents JavaScript access (for security)
            secure: true,    // ✅ Set to true in production with HTTPS
            sameSite: "None", // ✅ Required for cross-origin requests
        })
        res.json({ message: "Login successful", token });
    } catch (error) {
        console.log(error)
    }
}

const logout = async (req, res) => {
    console.log('logout')
    res.clearCookie("token", {
        // withCredentials: true,
        httpOnly: true,   // ✅ Prevents JavaScript access (for security)
        secure: true,
        sameSite: "None",
    });
    res.json({ message: "Logged out successfully" });
}

const test = (req, res) => {
    const id = req.userId
    console.log("id:", id)
    res.json('im here ' + id)
}




module.exports = { createUser, Login, signInWithGoogle, test, logout, signInWithFaceBook }