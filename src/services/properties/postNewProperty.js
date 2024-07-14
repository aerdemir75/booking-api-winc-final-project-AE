import { PrismaClient } from "@prisma/client";
import check from "../../utils/checkData.js";

const createNewProperty = async (title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating) => {
    //check inputs
    if (title && !check("name", title)) { return `${title} is not a valid title`; }
    if (location && !check("name", location)) { return `${location} is not a valid location name`; }
    if (bedroomCount && !check("number", bedroomCount)) { return `${bedroomCount} is not a valid number`; }
    if (bathRoomCount && !check("number", bathRoomCount)) { return `${bathRoomCount} is not a valid number`; }
    if (maxGuestCount && !check("number", maxGuestCount)) { return `${maxGuestCount} is not a valid number`; }
    if (rating && !check("number", rating)) { return `${rating} is not a valid number`; }
    if (pricePerNight && !check("price", pricePerNight)) { return `${pricePerNight} is not a valid price`; }

    //typecast numbers and prices
    if (typeof (bedroomCount) === 'string') { parseInt(bedroomCount); }
    if (typeof (bathRoomCount) === 'string') { parseInt(bathRoomCount); }
    if (typeof (maxGuestCount) === 'string') { parseInt(maxGuestCount); }
    if (typeof (rating) === 'string') { parseInt(rating); }

    //if everything well update the database
    const prisma = new PrismaClient();

    return prisma.property.create({
        data: { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating }
    })
}

export default createNewProperty;