
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config()
import mongoose from "mongoose";
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
const app = express();
app.use(cors())
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/post', PostRoute)







mongoose.connect(`mongodb+srv://${process.env.mongousername}:${process.env.mongopassword}@cluster0.ryjtulj.mongodb.net/sociallyDB?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(process.env.port, () => console.log("Listening"))).catch(err => console.log(err))



