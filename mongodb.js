// // CRUD create read operate delete

// // import mongodb from 'mongodb'
// // const MongoClient = mongodb.MongoClient
// // const ObjectID = mongodb.ObjectId

// import { MongoClient, ObjectId } from "mongodb";

// const connectionURL = "mongodb://127.0.0.1:27017";
// const databaseName = "task-manager";

// //Method : 1

// // MongoClient.connect(connectionURL, { 'useNewUrlParser': true }, (error, client) => {
// //     if (error) {
// //         return console.log('Unable to connect to database')
// //     }

// //     try {
// //         const db = client.db(databaseName)

// //         db.collection('users').findOne({ name: 'Jen'})
// //         console.log(user)

// //     } catch (e) {
// //         console.log('User not Found')
// //     }
// // })

// //Method : 2

// const client = new MongoClient(connectionURL);

// const findUser = async () => {
//   try {
//     const db = client.db(databaseName);
//     const users = db.collection("users");
//     // const query = {_id: ObjectId("63c7c656872c3e0ad64b9127")}

//     // const findUser1 = await users.findOne(query)
//     const findUser2 = await users.find({ age: 22 }).toArray();
//     console.log("🚀 ~ file: mongodb.js:42 ~ findUser ~ findUser2", findUser2);
//   } catch (e) {
//     // print (e.message)
//   }
// };

// // findUser()

// // const findTask = async () => {
// //     try {
// //         const db = client.db(databaseName)
// //         const tasks = db.collection('tasks')

// //         const task = await tasks.findOne({_id: ObjectId("63c7a2f00078754a3a4ef68d")})
// //         const incompletedTasks = await tasks.find({completed: false}).toArray()
// //         console.log("🚀 ~ file: mongodb.js:58 ~ findTask ~ incompletedTasks", incompletedTasks)
// //         console.log("🚀 ~ file: mongodb.js:57 ~ findTask ~ task", task)
// //     } catch {
// //         console.log('Error')
// //     }
// // }

// // findTask()

// const updateUser = () => {
//   const db = client.db(databaseName);

//   const users = db.collection("users");
//   const user = users
//     .updateOne(
//       {
//         _id: ObjectId("63c7c6f8328e166fc0d46578"),
//       },
//       {
//         $inc: {
//           age: 1,
//         },
//       }
//     )
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
// // updateUser()

// const updateManyUser = () => {
//   const db = client.db(databaseName);

//   const tasks = db.collection("tasks");
//   const task = tasks
//     .updateMany(
//       {
//         completed: false,
//       },
//       {
//         $set: {
//           completed: true,
//         },
//       }
//     )
//     .then((result) => {
//       console.log(result.modifiedCount);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// // updateManyUser()

// const deleteUsers = () => {
//   const db = client.db(databaseName);
//   const users = db.collection("users");
//   users
//     .deleteMany({
//       age: 28,
//     })
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// // deleteUsers()

// const deleteTasks = () => {
//   const db = client.db(databaseName);
//   const tasks = db.collection("tasks");

//   tasks
//     .deleteOne({
//       description: "Buy phone",
//     })
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// // deleteTasks()
