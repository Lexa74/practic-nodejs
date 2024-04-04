import {Request, Response, Router} from "express";
import crypto from "crypto";

const router = Router()

type userType = {
    id: string,
    name: string,
    age: number,
    isAdmin: boolean,
    experience: number
}

const users: userType[] = [
    {
        id: '1',
        name: 'Misha',
        age: 19,
        isAdmin: false,
        experience: 0
    },
    {
        id: '2',
        name: 'Tanya',
        age: 28,
        isAdmin: false,
        experience: 3
    },
    {
        id: '3',
        name: 'Alex',
        age: 41,
        isAdmin: false,
        experience: 3
    }
]

router.get('/', (req: Request, res: Response) => {
    res.send('Hello world')
})

router.get('/users', (req: Request, res: Response) => {
    res.json(users)
})

router.post('/users', (req: Request<{}, {}, userType>, res: Response) => {
    const {id, isAdmin} = req.body
    if(id) {
        return res.status(422).json({message: 'Нужно убрать id и объекта'})
    }

    if(!isAdmin) {
        return res.status(422).json({message: 'Поле isAdmin обязательное'})
    }

    const uniqId = crypto.randomUUID()
    users.push({...req.body, id: uniqId})
    res.status(200).json({message: 'Пользователь успшено добавлен'})
})

type paramsType = {
    id: string
}

router.get('/users/:id', (req: Request<paramsType>, res) => {
    const id = req.params.id
    const user = users.find(el => el.id === id)

    if(!user) {
        return res.status(404).json({message: 'Пользователь не найден'})
    }

    res.status(200).json(user)
})

router.put('/users/:id', (req: Request<paramsType, {}, userType>, res: Response) => {
    const idParam = req.params.id
    const user = users.find(el => el.id === idParam)

    const { name, age, experience} = req.body

    if(!user) {
        return res.status(404).json({message: 'Пользователь не найден'})
    }

    if(name) {
        user.name = req.body.name
    }
    if('isAdmin' in req.body) {
        user.isAdmin = req.body.isAdmin
    }
    if(age) {
        user.age = req.body.age
    }
    if(experience) {
        user.experience = req.body.experience
    }

    res.status(200).json(user)
})

router.delete('/users/:id',(req: Request<paramsType, {}, userType>, res: Response) => {
    const id = req.params.id

    const userIndex = users.findIndex((el) => el.id === id)

    users.splice(userIndex, 1)

    res.status(200).json({message: 'Users has been deleted'})
})

export default router