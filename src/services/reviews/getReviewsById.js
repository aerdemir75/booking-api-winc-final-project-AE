import { PrismaClient } from "@prisma/client";

const getReviewsById = async (id) => {
    const prisma = new PrismaClient();

    return prisma.review.findMany({
        where: { id }
    })
}

export default getReviewsById;