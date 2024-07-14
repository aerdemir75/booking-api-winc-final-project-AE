import { PrismaClient } from "@prisma/client";
import check from "../../utils/checkData.js";
import notFoundError from "../../errors/notFoundError.js";

const updateAmenity = async (id, name) => {
    //check input
    if (name && !check("name", name)) { return `${name} is not a valid name`; }

    //when well proceed
    const prisma = new PrismaClient();

    const updatedAmenity = await prisma.amenity.updateMany({
        where: { id },
        data: { name }
    })

    if (!updatedAmenity || updatedAmenity.count === 0) {
        throw new notFoundError("Amenity", id);
    }

    return `Amenity with id: ${id} is updated!`;


}

export default updateAmenity;