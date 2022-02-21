const express = require("express")
const doctorsRoutes = require("./doctors.routes")
const appointmentsRoutes = require("./appointments.routes")
const secretaryRoutes = require("./secretarys.routes")
const authenticationRoute = require("./controllers/authController")

const app = express();

app.use(express.json());
app.use(doctorsRoutes);
app.use(appointmentsRoutes);
app.use(secretaryRoutes);
app.use(authenticationRoute);

app.listen(3333, () => console.log("Server is up on 3333"))