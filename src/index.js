require('dotenv').config()

const express = require('express')
const cors = require('cors')
const loginRouter = require("./routes/loginRoutes");
const verifyLogin = require("./middlewares/loginMiddleware");
const registrationRouter = require("./routes/userRegistrationRoutes");
const userRouter = require('./routes/userRoutes');

const app = express()

app.use(express.json())
app.use(cors())

app.use('/login', loginRouter);
app.use('/registration', registrationRouter);



app.use('/', verifyLogin, userRouter)

app.listen(process.env.PORT || 3000, console.log(
    `Servidor rodando na porta ${process.env.PORT || 3000}`));
