import { PrismaClient } from "@prisma/client";


const getAmenityByQuery = async (id, name) => {

    const prisma = new PrismaClient();

    return prisma.amenity.findMany({
        where: { id, name }
    })
}

export default getAmenityByQuery;