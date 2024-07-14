import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";


const deleteHost = async (id) => {
    const prisma = new PrismaClient();

    //collect all properties from the host
    const propertiesToBeDeleted = await prisma.property.findMany({
        where: { hostId: id }
    })

    //delete all corresponding reviews, bookings and ultimately properties
    for (const propertyToDelete of propertiesToBeDeleted) {
        const id = propertyToDelete.id;
        console.log(id);
        const deletedBookings = await prisma.booking.deleteMany({
            where: { propertyId: id }
        })

        const deletedReviews = await prisma.review.deleteMany({
            where: { propertyId: id }
        })

        const deletedProperty = await prisma.property.deleteMany({
            where: { id }
        })
    }

    //once clean delete the host
    const deletedHost = await prisma.host.deleteMany({
        where: { id }
    })

    if (!deleteHost || deleteHost.count === 0) {
        throw new notFoundError("Host", id);
    }

    return `Host with id: ${id} is deleted!`;


}

export default deleteHost;