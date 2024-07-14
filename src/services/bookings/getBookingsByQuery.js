import { PrismaClient } from "@prisma/client";

const getBookingsByQuery = async (id, userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus) => {
    const prisma = new PrismaClient();

    numberOfGuests = numberOfGuests && parseInt(numberOfGuests);
    totalPrice = totalPrice && parseInt(totalPrice);

    return prisma.booking.findMany({
        where: { id, userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus }
    })
}

export default getBookingsByQuery;