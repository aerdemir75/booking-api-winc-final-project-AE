import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import check from "../../utils/checkData.js";

const createNewHost = async (username, password, name, email, phoneNumber, profilePicture, aboutMe) => {

    //check inputs
    if (username && !check("username", username)) { return `${username} is not a valid username`; }
    if (password && !check("password", password)) { return `${password} is not a valid password`; }
    if (name && !check("name", name)) { return `${name} is not a valid name`; }
    if (email && !check("email", email)) { return `${email} is not a valid email`; }
    if (phoneNumber && !check("phoneNumber", phoneNumber)) { return `${phoneNumber} is not a valid phone number`; }
    if (profilePicture && !check("image", profilePicture)) { return `${profilePicture} is not a valid url`; }

    //if inputs validated to type add the new host
    const prisma = new PrismaClient();

    //do a hash of the password
    const unhashed = password;
    const hashed = await bcrypt.hash(unhashed, 10);

    const createdHost = await prisma.host.create({
        data: { username, password: hashed, name, email, phoneNumber, profilePicture, aboutMe }
    })

    return createdHost;
}

export default createNewHost;