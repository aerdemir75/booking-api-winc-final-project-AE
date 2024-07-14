import axios from "axios";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const login = async (username, password) => {

    const prisma = new PrismaClient();
    try {

        const user = await prisma.user.findFirst({
            where: { username }
        });

        if (!user) {
            return null;
        }

        const match = await bcrypt.compare(password, user.password);


        if (!match) {
            return 'wrong credentials!';
        } else {

            try {
                const options = {
                    method: 'POST',
                    url: 'https://dev-dskirzqk72pz2dx4.us.auth0.com/oauth/token',
                    headers: { 'content-type': 'application/json' },
                    data: {
                        client_id: 'hCm13bbrByt3hluZU29Tq9VAExWYLKHt',
                        client_secret: 'dBabmnlKKRFyzUoeXco3uqHQFHl2AXLo8OP_Bo_DFSq4zD1BSWltT0jMqPQf_nYB',
                        audience: 'https://booking-final-winc',
                        grant_type: 'client_credentials'
                    }
                };

                const response = await axios(options);

                return response.data;
            } catch (error) {
                console.log("Could not connect to the authenticationserver.");
            }
        }



    } catch (error) {

        if (error.code === 'ECONNREFUSED') {
            console.log("Could not connect to the authenticationserver.");
        } else {
            console.log("Login failed, please try again later.");

        }
    } finally {
        await prisma.$disconnect(); // close Prisma connection
    }
};

export default login;