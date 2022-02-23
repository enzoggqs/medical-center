const express = require("express");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const authSecretary = require("../middlewares/authSecretary");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const authenticationRoute = express.Router();

// Register Secretary
authenticationRoute.post("/secretary", async (request, response) => {
  const { email, password } = request.body;

  const secretaryAlreadyExist = await prisma.secretary.findUnique({
    where: { email },
  });
  const doctorAlreadyExist = await prisma.doctor.findUnique({
    where: { email },
  });

  if (secretaryAlreadyExist || doctorAlreadyExist) {
    return response.status(404).json("Email already used");
  }

  const secretary = await prisma.secretary.create({
    data: {
      email,
      password,
    },
  });

  secretary.password = undefined;

  return response.status(201).send({
    secretary,
  });
});

// Register Doctor
authenticationRoute.post(
  "/doctors",
  authSecretary,
  async (request, response) => {
    const { name, email } = request.body;

    const secretaryAlreadyExist = await prisma.secretary.findUnique({
      where: { email },
    });
    const doctorAlreadyExist = await prisma.doctor.findUnique({
      where: { email },
    });

    if (doctorAlreadyExist || secretaryAlreadyExist) {
      return response.status(404).json("Email already used");
    }

    const doctor = await prisma.doctor.create({
      data: {
        name,
        email,
      },
    });

    return response.status(201).send({
      doctor,
    });
  }
);

// Secretary Login
authenticationRoute.post(
  "/authenticate/secretary",
  async (request, response) => {
    const { email, password } = request.body;

    if (!email) return response.status(400).send("Email field not filled");

    if (!password)
      return response.status(400).send("Password field not filled");

    var secretaryAlreadyExist = await prisma.secretary.findUnique({
      where: { email },
    });

    if (!secretaryAlreadyExist) {
      return response.status(404).json("Secretary not found");
    }

    if (secretaryAlreadyExist.password != password) {
      return response.status(400).send({ error: "Invalid password" });
    }

    const secret = authConfig.secret;

    const token = jwt.sign(
      {
        userType: "secretary",
        id: secretaryAlreadyExist.id,
      },
      secret,
      {
        expiresIn: 86400,
      }
    );

    secretaryAlreadyExist = {
      id: secretaryAlreadyExist.id,
      email: secretaryAlreadyExist.email,
    };

    return response.status(200).send({
      secretaryAlreadyExist,
      token,
    });
  }
);

// Doctor Login
authenticationRoute.post("/authenticate/doctor", async (request, response) => {
  const { email } = request.body;

  if (!email) return response.status(400).send("Email field not filled");

  const doctorAlreadyExist = await prisma.doctor.findUnique({
    where: { email },
  });

  if (!doctorAlreadyExist) {
    return response.status(404).json("Doctor not found");
  }

  const secret = authConfig.secret;

  const token = jwt.sign(
    {
      userType: "doctor",
      id: doctorAlreadyExist.id,
    },
    secret,
    {
      expiresIn: 86400,
    }
  );

  return response.status(200).send({
    doctorAlreadyExist,
    token,
  });
});

module.exports = authenticationRoute;
