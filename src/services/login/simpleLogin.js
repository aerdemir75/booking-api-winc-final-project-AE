import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from "bcrypt";
import notFoundError from "../../errors/notFoundError.js";

const login = async (username, password) => {

    const prisma = new PrismaClient();
    try {
        const user = await prisma.user.findFirst({
            where: { username }
        });

        if (!user) {
            return 'user not found';
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            const token = undefined;
            return token;
        } else if (match) {
            const secretKey = process.env.AUTH_SECRET_KEY || '}0l<8^!h"[9`BbS#m56wy:0Qa,rNZo';
            const token = jwt.sign({ userId: user.id }, secretKey);
            return token;
        }
    } catch (error) {
        return "Login failed, please try again later.";
    } finally {
        await prisma.$disconnect(); // close Prisma connection
    }
};

export default login;