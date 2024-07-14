import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const deleteProperty = async (id) => {
    const prisma = new PrismaClient();

    const deletedBookings = await prisma.booking.deleteMany({
        where: { propertyId: id }
    })

    const deletedReviews = await prisma.review.deleteMany({
        where: { propertyId: id }
    })

    const deletedProperty = await prisma.property.deleteMany({
        where: { id }
    })

    if (!deleteProperty || deleteProperty.count === 0) {
        throw new notFoundError("Property", id);
    }

    return `Property with id: ${id} is deleted!`;
}

export default deleteProperty;