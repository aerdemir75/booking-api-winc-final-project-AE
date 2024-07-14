import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const deleteAmenity = async (id) => {
    const prisma = new PrismaClient();

    const deletedAmenity = await prisma.amenity.deleteMany({
        where: { id }
    })

    if (!deleteAmenity || deleteAmenity.count === 0) {
        throw new notFoundError('Amenity', id);
    }

    return `Amenity with id: ${id} is deleted!`;


}

export default deleteAmenity;