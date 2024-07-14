import { PrismaClient } from "@prisma/client";

const getBookingsById = async (id) => {
    const prisma = new PrismaClient();

    return prisma.booking.findMany({
        where: { id }
    })
}

export default getBookingsById;