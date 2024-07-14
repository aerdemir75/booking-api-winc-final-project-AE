import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const deleteBooking = async (id) => {
    const prisma = new PrismaClient();

    const deletedBooking = await prisma.booking.deleteMany({
        where: { id }
    })

    if (!deleteBooking || deleteBooking.count === 0) {
        throw new notFoundError("Booking", id);
    }

    return `Booking with id: ${id} is deleted!`;


}

export default deleteBooking;