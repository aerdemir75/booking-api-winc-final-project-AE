import { PrismaClient } from "@prisma/client";
import check from "../../utils/checkData.js";

const createNewReview = async (userId, propertyId, rating, comment) => {

    //check inputs
    if (rating && !check("number", rating)) { return `${rating} is not a valid number`; }

    //typecast numbers and prices
    if (typeof (rating) === 'string') { rating = parseInt(rating); }

    //if everything well add to the database
    const prisma = new PrismaClient();

    return prisma.review.create({
        data: { userId, propertyId, rating, comment }
    })
}

export default createNewReview;