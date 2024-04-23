import {Request, Response} from "express";
import {User} from "../models/user.model";

type userType = {
    id: string,
    name: string,
    age: number,
    isAdmin: boolean,
    experience: number
}

type paramsType = {
    id: string
}

const getUsers = (_: Request, res: Response) => {
    User.find({}).then((data) => {
        res.status(200).json(data)
    })
        .catch((err) => {
            res.status(500).json({message: err.message})
        })
}

const getUserById = (req: Request<paramsType, {}, userType>, res: Response) => {
    const id = req.params.id

    User.findById(id).then((data) => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(500).json({message: err.message})
    })
}

const addUser = (req: Request<paramsType>, res: Response) => {
    User.create(req.body).then(() => {
        res.status(200).json({message: 'Created user'})
    }).catch((err) => {
        res.status(500).json({message: err.message})
    })
}

const updateUser = (req: Request<paramsType, {}, userType>, res: Response) => {
    const idParam = req.params.id
    User.findByIdAndUpdate(idParam, req.body).then(() => User.findById(idParam))
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json({message: err.message})
        })
}

const delUser = (req: Request<paramsType, {}, userType>, res: Response) => {
    const id = req.params.id

    User.findByIdAndDelete(id).then(() => {
        res.status(200).json({message: 'Deleted'})
    }).catch((err) => {
        res.status(500).json({message: err.message})
    })
}

export {getUsers, getUserById, addUser, updateUser, delUser}