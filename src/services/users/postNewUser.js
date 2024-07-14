import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import check from "../../utils/checkData.js";

const createNewUser = async (username, password, name, email, phoneNumber, profilePicture) => {
    //check inputs
    if (username && !check("username", username)) { return `${username} is not a valid username`; }
    if (password && !check("password", password)) { return `${password} is not a valid password`; }
    if (name && !check("name", name)) { return `${name} is not a valid name`; }
    if (email && !check("email", email)) { return `${email} is not a valid email`; }
    if (phoneNumber && !check("phoneNumber", phoneNumber)) { return `${phoneNumber} is not a valid phone number`; }
    if (profilePicture && !check("image", profilePicture)) { return `${profilePicture} is not a valid url`; }
    //when checked setup the connection and  update database
    const prisma = new PrismaClient();

    //optional: regex on username, name, email, phoneNumber, profileUrl
    //do a hash of the password
    const unhashed = password;
    const hashed = await bcrypt.hash(unhashed, 10);

    const createdUser = await prisma.user.create({
        data: { username, password: hashed, name, email, phoneNumber, profilePicture }
    });

    return createdUser;
}

export default createNewUser;