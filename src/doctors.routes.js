const express = require("express");
const authDoctor = require("./middlewares/authDoctor");

const doctorsRoutes = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create appointment
doctorsRoutes.post(
  "/doctor/appointment",
  authDoctor,
  async (request, response) => {
    if (request.userType != "doctor")
      return response.status(400).json("Permission denied");

    const { patientName, date } = request.body;
    const doctorId = request.userId;

    const appointment = await prisma.appointment.create({
      data: {
        patientName,
        date,
        doctor: {
          connect: {
            id: doctorId,
          },
        },
      },
    });
    return response
      .status(201)
      .json({ appointment: appointment, user: request.userId });
  }
);

// Read appointments
doctorsRoutes.get(
  "/doctor/appointments",
  authDoctor,
  async (request, response) => {
    if (request.userType != "doctor")
      return response.status(400).json("Permission denied");

    const appointment = await prisma.appointment.findMany({
      orderBy: {
        date: "asc",
      },
      where: {
        doctorId: request.userId,
      },
    });
    return response.status(200).json(appointment);
  }
);

// Update appointment
doctorsRoutes.put(
  "/doctor/appointment",
  authDoctor,
  async (request, response) => {
    if (request.userType != "doctor")
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

    if (appointmentAlreadyExist.doctorId != request.userId) {
      return response.status(400).json("Post does not belong to the doctor");
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

// Delete appointment
doctorsRoutes.delete(
  "/doctor/appointment/:id",
  authDoctor,
  async (request, response) => {
    if (request.userType != "doctor")
      return response.status(400).json("Permission denied");
    const { id } = request.params;
    const intId = parseInt(id);

    if (!intId) {
      return response.status(400).json("Id is mandatory");
    }

    const appointmentAlreadyExist = await prisma.appointment.findUnique({
      where: { id: intId },
    });

    console.log(appointmentAlreadyExist);

    if (!appointmentAlreadyExist) {
      return response.status(404).json("Appointment not exists");
    }

    if (appointmentAlreadyExist.doctorId != request.userId) {
      return response.status(400).json("Post does not belong to the doctor");
    }

    await prisma.appointment.delete({ where: { id: intId } });
    return response.status(200).send();
  }
);

module.exports = doctorsRoutes;
