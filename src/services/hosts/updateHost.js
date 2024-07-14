import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import check from "../../utils/checkData.js";
import notFoundError from "../../errors/notFoundError.js";

const updateHost = async (id, username, password, name, email, phoneNumber, profilePicture, aboutMe) => {
    //check inputs
    if (username && !check("username", username)) { return `${username} is not a valid username`; }
    if (password && !check("password", password)) { return `${password} is not a valid password`; }
    if (name && !check("name", name)) { return `${name} is not a valid name`; }
    if (email && !check("email", email)) { return `${email} is not a valid email`; }
    if (phoneNumber && !check("phoneNumber", phoneNumber)) { return `${phoneNumber} is not a valid phone number`; }
    if (profilePicture && !check("image", profilePicture)) { return `${profilePicture} is not a valid url`; }

    //when inputs validated continue to update host information
    const prisma = new PrismaClient();

    //hash password if password
    let hashed = password;
    if (password && (password.length > 2)) {
        const unhashed = password;
        hashed = await bcrypt.hash(unhashed, 10).then(async function (hashed) { return hashed; });
    }

    const updatedHost = await prisma.host.updateMany({
        where: { id },
        data: {
            username, password: hashed || password, name, email, phoneNumber, profilePicture, aboutMe
        }
    })

    if (!updatedHost || updatedHost.count === 0) {
        throw new notFoundError("Host", id);
    }

    return `Host with id: ${id} is updated!`;


}

export default updateHost;