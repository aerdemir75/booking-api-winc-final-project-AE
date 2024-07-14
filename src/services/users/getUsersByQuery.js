import { PrismaClient } from "@prisma/client";

const getUsersByQuery = async (id, username, name, email, phoneNumber, profilePicture) => {
    const prisma = new PrismaClient();

    const getUserByQuery = prisma.user.findMany({
        where: { id, username, name, email, phoneNumber, profilePicture },
        select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            profilePicture: true
        }

    })

    return getUserByQuery;
}

export default getUsersByQuery;