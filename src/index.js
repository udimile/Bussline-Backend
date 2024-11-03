require('dotenv').config()

const express = require('express')
const cors = require('cors')
const loginRouter = require("./routes/loginRoutes");
const verifyLogin = require("./middlewares/loginMiddleware");
const registrationRouter = require("./routes/userRegistrationMiddleware");

const app = express()

app.use(express.json())
app.use(cors())

app.use('/login', loginRouter);

app.use(verifyLogin);

app.use('/registration', registrationRouter);

app.listen(process.env.PORT || 3000);