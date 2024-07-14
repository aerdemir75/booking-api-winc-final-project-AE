import { PrismaClient } from "@prisma/client";
import check from "../../utils/checkData.js";
import notFoundError from "../../errors/notFoundError.js";

const updateReview = async (id, userId, propertyId, rating, comment) => {

    //check inputs
    if (rating && !check("number", rating)) { return `${rating} is not a valid number`; }

    //typecast numbers and prices
    if (typeof (rating) === 'string') { rating = parseInt(rating); }

    //if everything well add to the database
    const prisma = new PrismaClient();

    const updatedReview = await prisma.review.updateMany({
        where: { id },
        data: { userId, propertyId, rating, comment }
    })

    if (!updatedReview || updatedReview.count === 0) {
        throw new notFoundError("Review", id);
    }

    return `Review with id: ${id} is updated!`;


}

export default updateReview;