import express from 'express'
import ('./db/mongoose.js')
import { userRouter } from './modules/user/user-router.js'
import { taskRouter } from './modules/task/task-router.js'
import jwt from 'jsonwebtoken'


const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are desabled')
//     }else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Server under maintanance')
// })

app.use(express.json())
app.use('/user', userRouter)
app.use('/task', taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})



// const myFunction = async () => {
//     const token = jwt.sign({ _id:'abcd1234@#$' }, 'thisismynewcourse', { expiresIn: '7 days' })
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log("🚀 ~ file: index.js:26 ~ myFunction ~ data", data)
// }

// myFunction()