const express = require("express")
const authSecretary = require("./middlewares/authDoctor")

const secretaryRoutes = express.Router()
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

// Read
secretaryRoutes.get("/secretarys", authSecretary, async (request, response) => {
    console.log(req.userType)
    const secretary = await prisma.secretary.findMany({select: {
        email: true,
        password: false,
    }})
    return response.status(200).json(secretary);
})

// Update
secretaryRoutes.put("/secretary", async (request, response) => {
    const {email, password, id} = request.body

    if(!id){
        return response.status(400).json("Id is mandatory")
    }

    const secretaryAlreadyExist = await prisma.secretary.findUnique({ where: { id }});

    if(!secretaryAlreadyExist) {
        return response.status(404).json("Secretary not exists")
    }

    const secretary = await prisma.secretary.update({
        where: {
            id,
        },
        data: {
            email,
            password
        }
    })

    return response.status(200).json(secretary)
})

// Delete
secretaryRoutes.delete("/secretary/:id", async  (request, response) => {
    const {id} = request.params;
    const intId = parseInt(id);

    if(!intId){
        return response.status(400).json("Id is mandatory")
    }

    const secretaryAlreadyExist = await prisma.secretary.findUnique({ where: { id: intId }});

    if(!secretaryAlreadyExist) {
        return response.status(404).json("Secretary not exists")
    }

    await prisma.secretary.delete({ where: { id: intId }});
    return response.status(200).send();
});

module.exports = secretaryRoutes;