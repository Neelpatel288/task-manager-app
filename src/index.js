import express from 'express'
import ('./db/mongoose.js')
import { userRouter } from './modules/user/user-router.js'
import { taskRouter } from './modules/task/task-router.js'


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/user', userRouter)
app.use('/task', taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})