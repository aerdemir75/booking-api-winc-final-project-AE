import { PrismaClient } from "@prisma/client";
import check from "../../utils/checkData.js";

const createNewBooking = async (userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus) => {
    //check inputs
    if (checkinDate && !check("date", checkinDate)) { return `${checkinDate} is not a valid date`; }
    if (checkoutDate && !check("date", checkoutDate)) { return `${checkoutDate} is not a valid date`; }
    if (numberOfGuests && !check("number", numberOfGuests)) { return `${numberOfGuests} is not a valid number`; }
    if (totalPrice && !check("number", totalPrice)) { return `${totalPrice} is not a valid price`; }

    //check date out higher then datein
    if (checkinDate && checkoutDate && (checkinDate >= checkoutDate)) {
        return 'Make sure the check in is before the checkout';
    }

    //typecast numbers and prices
    if (typeof (totalPrice) === 'string') { parseInt(totalPrice); }
    if (typeof (numberOfGuests) === 'string') { numberOfGuests = parseInt(numberOfGuests); }

    //if inputs validated add the new booking
    const prisma = new PrismaClient();

    return prisma.booking.create({
        data: { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus }
    })
}

export default createNewBooking;