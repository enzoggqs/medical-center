const express = require("express")

const doctorsRoutes = express.Router()
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

// Read
doctorsRoutes.get("/doctors", async (request, response) => {
    const doctors = await prisma.doctor.findMany()
    return response.status(200).json(doctors);
})

// Update
doctorsRoutes.put("/doctors", async (request, response) => {
    const {name, id} = request.body

    if(!id){
        return response.status(400).json("Id is mandatory")
    }

    const doctorAlreadyExist = await prisma.doctor.findUnique({ where: { id }});

    if(!doctorAlreadyExist) {
        return response.status(404).json("Doctor not exists")
    }

    const doctor = await prisma.doctor.update({
        where: {
            id,
        },
        data: {
            name,
        }
    })

    return response.status(200).json(doctor)
})

// Delete

doctorsRoutes.delete("/doctor/:id", async  (request, response) => {
    const {id} = request.params;
    const intId = parseInt(id);

    if(!intId){
        return response.status(400).json("Id is mandatory")
    }

    const doctorAlreadyExist = await prisma.doctor.findUnique({ where: { id: intId }});

    if(!doctorAlreadyExist) {
        return response.status(404).json("Doctor not exists")
    }

    await prisma.doctor.delete({ where: { id: intId }});
    return response.status(200).send();
});

module.exports = doctorsRoutes;