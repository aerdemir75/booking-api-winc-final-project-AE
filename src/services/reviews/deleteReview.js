import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const deleteReview = async (id) => {
    const prisma = new PrismaClient();

    const deletedReview = await prisma.review.deleteMany({
        where: { id }
    })

    if (!deleteReview || deleteReview.count === 0) {
        throw new notFoundError("Review", id);
    }

    return `Review with id: ${id} is deleted!`;


}

export default deleteReview;