import { PrismaClient } from "@prisma/client";


const getAmenityById = async (id) => {
    const prisma = new PrismaClient();

    const foundAmenity = await prisma.amenity.findMany({
        where: { id }
    })

    if (foundAmenity.length > 0) {
        return foundAmenity;
    } else {
        return `Sorry the id: ${id} was not found.`;
    }
}

export default getAmenityById;