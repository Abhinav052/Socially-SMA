import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
export const getUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await UserModel.findById(id);

        if (user) {
            const { password, ...other } = user._doc

            res.status(200).json(other)
        }
        else {
            res.status(404).json("user does not exist")
        }
    } catch (error) {
        res.status(500).json(error)
    }
};


export const updateUser = async (req, res) => {
    const id = req.params.id
    const { currentUserId, currentUserAdminStatus, password } = req.body
    if (id === currentUserId || currentUserAdminStatus) {
        try {
            if (password) {
                const salt = await await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password, salt)
            }
            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true })
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(403).json("Forbidden")
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId, currentUserAdminStatus } = req.body
    if (id === currentUserId || currentUserAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("user delete succes")
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(403).json("Forbidden")
    }
}

export const followUSer = async (req, res) => {
    const id = req.params.id
    const { currentUserId } = req.body
    if (currentUserId === id) {
        res.student(403).json("Forbidden")
    }
    else {
        try {
            const followUser = await UserModel.findById(id)
            const followingUSer = await UserModel.findById(currentUserId)
            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $push: { followers: currentUserId } })
                await followingUSer.updateOne({ $push: { following: id } })
                res.status(200).json("success")
            }
            else {
                res.status(403).json("Already following")
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

export const UnfollowUSer = async (req, res) => {
    const id = req.params.id
    const { currentUserId } = req.body
    if (currentUserId === id) {
        res.student(403).json("Forbidden")
    }
    else {
        try {
            const followUser = await UserModel.findById(id)
            const followingUSer = await UserModel.findById(currentUserId)
            if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $pull: { followers: currentUserId } })
                await followingUSer.updateOne({ $pull: { following: id } })
                res.status(200).json("success unfollowed")
            }
            else {
                res.status(403).json("Already following")
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
}