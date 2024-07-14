import { PrismaClient } from "@prisma/client";
import notFoundError from "../../errors/notFoundError.js";

const deleteUser = async (id) => {
    const prisma = new PrismaClient();
    console.log(id);

    const userId = id;

    const deletedReviews = await prisma.review.deleteMany({
        where: { userId: userId },
    })

    const deletedBookings = await prisma.booking.deleteMany({
        where: { userId: userId },
    })

    const deletedUser = await prisma.user.deleteMany({
        where: { id: userId },
    })

    if (!deleteUser || deletedUser.count == 0) {
        throw new notFoundError("User", id);
    }

    return `User with id: ${id} is deleted!`

}

export default deleteUser;