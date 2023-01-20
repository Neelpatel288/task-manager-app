import ('../src/db/mongoose.js')
import { User } from '../src/models/user.js'

User.findByIdAndUpdate('63ca43bb2838a21c0e1f99f9', {age: 1}).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then ((result) => {
    console.log(result)
}).catch ((e) => {
    console.log(e)
})