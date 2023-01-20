import ('../src/db/mongoose.js')
import { Task } from '../src/models/task.js'

Task.findByIdAndDelete('63ca4ea77bece46cbe94aa71').then((user) => {
    console.log(user)

    return Task.countDocuments({completed : false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})