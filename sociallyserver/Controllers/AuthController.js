import UserModel from "../Models/userModel.js"
import bcrypt from 'bcrypt'


export const registerUser = async (req, res) => {
    const { username, password, firstname, lastname } = req.body;
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const newUser = new UserModel({ username, password: hashedPass, firstname, lastname })
    try {
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await UserModel.findOne({ username: username })
        if (user) {
            const val = await bcrypt.compare(password, user.password)
            val ? res.status(200).json(user) : res.status(400).json("Wrong password")
        }
        else {
            res.status(400).json("user not exist")
        }
    } catch (error) {
        res.status(400).json("login error" + error)
    }
}