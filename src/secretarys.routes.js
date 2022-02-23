const express = require("express");
const authSecretary = require("./middlewares/authSecretary");

const secretaryRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Read Secretarys
secretaryRoutes.get("/secretarys", async (request, response) => {
  const secretary = await prisma.secretary.findMany({
    select: {
      email: true,
      password: false,
    },
  });
  return response.status(200).json(secretary);
});

// Update Secretary
secretaryRoutes.put("/secretary", async (request, response) => {
  const { email, password, id } = request.body;

  if (!id) {
    return response.status(400).json("Id is mandatory");
  }

  const secretaryAlreadyExist = await prisma.secretary.findUnique({
    where: { id },
  });

  if (!secretaryAlreadyExist) {
    return response.status(404).json("Secretary not exists");
  }

  const secretary = await prisma.secretary.update({
    where: {
      id,
    },
    data: {
      email,
      password,
    },
  });

  return response.status(200).json(secretary);
});

// Delete Secretary
secretaryRoutes.delete("/secretary/:id", async (request, response) => {
  const { id } = request.params;
  const intId = parseInt(id);

  if (!intId) {
    return response.status(400).json("Id is mandatory");
  }

  const secretaryAlreadyExist = await prisma.secretary.findUnique({
    where: { id: intId },
  });

  if (!secretaryAlreadyExist) {
    return response.status(404).json("Secretary not exists");
  }

  await prisma.secretary.delete({ where: { id: intId } });
  return response.status(200).send();
});

// Read doctors
secretaryRoutes.get(
  "/secretary/doctors",
  authSecretary,
  async (request, response) => {
    if (request.userType != "secretary")
      return response.status(400).json("Permission denied");
    const doctors = await prisma.doctor.findMany();
    return response
      .status(200)
      .json({ doctors: doctors, user: request.userId });
  }
);

// Update doctor
secretaryRoutes.put(
  "/secretary/doctors",
  authSecretary,
  async (request, response) => {
    if (request.userType != "secretary")
      return response.status(400).json("Permission denied");
    const { name, id } = request.body;

    if (!id) {
      return response.status(400).json("Id is mandatory");
    }

    const doctorAlreadyExist = await prisma.doctor.findUnique({
      where: { id },
    });

    if (!doctorAlreadyExist) {
      return response.status(404).json("Doctor not exists");
    }

    const doctor = await prisma.doctor.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return response.status(200).json(doctor);
  }
);

// Delete Doctor
secretaryRoutes.delete(
  "/secretary/doctor/:id",
  authSecretary,
  async (request, response) => {
    if (request.userType != "secretary")
      return response.status(400).json("Permission denied");
    const { id } = request.params;
    const intId = parseInt(id);

    if (!intId) {
      return response.status(400).json("Id is mandatory");
    }

    const doctorAlreadyExist = await prisma.doctor.findUnique({
      where: { id: intId },
    });

    if (!doctorAlreadyExist) {
      return response.status(404).json("Doctor not exists");
    }

    await prisma.doctor.delete({ where: { id: intId } });
    return response.status(200).send();
  }
);

// Create appointment
secretaryRoutes.post(
  "/secretary/appointment",
  authSecretary,
  async (request, response) => {
    if (request.userType != "secretary")
      return response.status(400).json("Permission denied");
    const { doctorId, patientName, date } = request.body;

    const appointment = await prisma.appointment.create({
      data: {
        doctorId,
        patientName,
        date,
      },
    });
    return response
      .status(201)
      .json({ appointment: appointment, user: request.userId });
  }
);

// Read appointments
secretaryRoutes.get(
  "/secretary/appointments",
  authSecretary,
  async (request, response) => {
    if (request.userType != "secretary")
      return response.status(400).json("Permission denied");
    const appointment = await prisma.appointment.findMany({
      orderBy: {
        date: "asc",
      },
    });
    return response.status(200).json(appointment);
  }
);

// Update appointment
secretaryRoutes.put(
  "/secretary/appointment",
  authSecretary,
  async (request, response) => {
    if (request.userType != "secretary")
      return response.status(400).json("Permission denied");
    const { date, patientName, id } = request.body;

    if (!id) {
      return response.status(400).json("Id is mandatory");
    }

    const appointmentAlreadyExist = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointmentAlreadyExist) {
      return response.status(404).json("Appointment not exists");
    }

    const appointment = await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        date,
        patientName,
      },
    });

    return response.status(200).json(appointment);
  }
);

module.exports = secretaryRoutes;
