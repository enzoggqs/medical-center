const express = require("express")
const authDoctor = require("./middlewares/authDoctor")

const appointmentsRoutes = express.Router()
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

// Create
appointmentsRoutes.post("/doctor/appointment", authDoctor, async (request, response) => {
    const {patientName, date} = request.body;
    const doctorId = request.userId;

    const appointment = await prisma.appointment.create({
        data: {
            doctorId, patientName, date
        },
    });
    return response.status(201).json({appointment: appointment, user: request.userId})
});

// Read
appointmentsRoutes.get("/doctor/appointments", authDoctor, async (request, response) => {
    const appointment = await prisma.appointment.findMany(
    {
        orderBy: {
            date: 'asc'
        },
        where: {
            doctorId: request.userId
        }
    }
    )
    return response.status(200).json(appointment);
})

// Update
appointmentsRoutes.put("/doctor/appointment", authDoctor, async (request, response) => {
    const {date, patientName, id} = request.body

    if(!id){
        return response.status(400).json("Id is mandatory")
    }

    const appointmentAlreadyExist = await prisma.appointment.findUnique({ where: { id }});

    if(!appointmentAlreadyExist) {
        return response.status(404).json("Appointment not exists")
    }

    if(appointmentAlreadyExist.doctorId != request.userId){
        return response.status(400).json("Post does not belong to the doctor")
    }

    const appointment = await prisma.appointment.update({
        where: {
            id,
        },
        data: {
            date,
            patientName
        }
    })

    return response.status(200).json(appointment)
})

// Delete

appointmentsRoutes.delete("/doctor/appointment/:id", authDoctor, async  (request, response) => {
    const {id} = request.params;
    const intId = parseInt(id);

    if(!intId){
        return response.status(400).json("Id is mandatory")
    }

    const appointmentAlreadyExist = await prisma.appointment.findUnique({ where: { id: intId }});
    if(!appointmentAlreadyExist) {
        return response.status(404).json("Appointment not exists")
    }

    await prisma.appointment.delete({ where: { id: intId }});
    return response.status(200).send();
});

module.exports = appointmentsRoutes;