import express from "express";

//middleware
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';

//services import
import getHostsById from "../services/hosts/getHostsById.js";
import getHostsByQuery from "../services/hosts/getHostsByQuery.js";
import createNewHost from "../services/hosts/postNewHost.js";
import updateHost from "../services/hosts/updateHost.js";
import deleteHost from "../services/hosts/deleteHost.js";

const router = new express.Router();

router.get('/', async (req, res) => {
    try {
        const { id, name, email, phoneNumber, profilePicture, aboutMe } = req.query;
        const host = await getHostsByQuery(id, name, email, phoneNumber, profilePicture, aboutMe);
        res.status(200).json(host);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler)

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const host = await getHostsById(id);
    res.status(200).json(host);
})

router.post('/', authMiddleware, async (req, res) => {
    const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;
    const newHost = await createNewHost(username, password, name, email, phoneNumber, profilePicture, aboutMe);
    res.status(201).json(newHost);
})

router.put('/:id', authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;
        const updatedHost = await updateHost(id, username, password, name, email, phoneNumber, profilePicture, aboutMe);
        res.status(200).json(updatedHost);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler)

router.delete('/:id', authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedHost = await deleteHost(id);
        res.status(200).json(deletedHost);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler)




export default router;
