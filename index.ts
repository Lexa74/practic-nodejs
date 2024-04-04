import express from 'express'
import userRouter from './routing/userRoutes'

const app = express()

app.use(express.json())

app.use('/', userRouter)

const port = 3001

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})