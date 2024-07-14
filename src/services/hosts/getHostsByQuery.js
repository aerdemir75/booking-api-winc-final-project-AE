import { PrismaClient } from "@prisma/client";

const getHostsByQuery = async (id, name, email, phoneNumberGiven, profilePicture, aboutMe) => {
    const prisma = new PrismaClient();

    return prisma.host.findMany({
        where: { id, name, email, phoneNumberGiven, profilePicture, aboutMe },
        select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            profilePicture: true,
            aboutMe: true,
        }
    })
}

export default getHostsByQuery;