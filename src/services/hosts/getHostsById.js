import { PrismaClient } from "@prisma/client";

const getHostsById = async (id) => {
    const prisma = new PrismaClient();


    return prisma.host.findMany({
        where: { id },
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

export default getHostsById;