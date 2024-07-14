import { PrismaClient } from "@prisma/client";
import check from "../../utils/checkData.js";

const createNewAmenity = async (name) => {

    //validate input
    if (name && !check("comodityname", name)) { return `${name} is not a valid name`; }

    //proceed when okay
    const prisma = new PrismaClient();

    const response = await prisma.amenity.create({
        data: { name }
    });

    return response;

}

export default createNewAmenity;