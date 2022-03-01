const express = require("express")
var cors = require('cors');

const doctorsRoutes = require("./doctors.routes")
const secretaryRoutes = require("./secretarys.routes")
const authenticationRoute = require("./controllers/authController")

const app = express();
app.use(cors());


app.use(express.json());
app.use(doctorsRoutes);
app.use(secretaryRoutes);
app.use(authenticationRoute);

app.listen(3333, () => console.log("Server is up on 3333"))