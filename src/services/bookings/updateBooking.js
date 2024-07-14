import { PrismaClient } from "@prisma/client";
import check from "../../utils/checkData.js";
import notFoundError from "../../errors/notFoundError.js";

const updateBooking = async (id, userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus) => {
    //check inputs
    if (checkinDate && !check("date", checkinDate)) { return `${checkinDate} is not a valid date`; }
    if (checkoutDate && !check("date", checkoutDate)) { return `${checkoutDate} is not a valid date`; }
    if (numberOfGuests && !check("number", numberOfGuests)) { return `${numberOfGuests} is not a valid number`; }
    if (totalPrice && !check("price", totalPrice)) { return `${totalPrice} is not a valid price`; }

    //check date out higher then datein
    if (checkinDate && checkoutDate && (checkinDate >= checkoutDate)) {
        console.log(checkDates)
        return 'Make sure the check in is before the checkout';
    }

    //typecast numbers and prices
    if (typeof (numberOfGuests) === 'string') { numberOfGuests = parseInt(numberOfGuests); }
    if (typeof (totalPrice) === 'string') { parseInt(totalPrice); }

    //if everything well update the database
    const prisma = new PrismaClient();

    const updatedBooking = await prisma.booking.updateMany({
        where: { id },
        data: { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus }
    })

    if (!updatedBooking || updatedBooking.count === 0) {
        throw new notFoundError("Booking", id);
    }

    return `Booking with id: ${id} is updated!`;


}

export default updateBooking;