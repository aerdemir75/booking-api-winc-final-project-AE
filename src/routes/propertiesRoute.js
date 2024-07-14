import express from "express";

//middleware
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';

//services import
import getPropertiesById from "../services/properties/getPropertiesById.js";
import getPropertiesByQuery from "../services/properties/getPropertiesByQuery.js";
import createNewProperty from "../services/properties/postNewProperty.js";
import updateProperty from "../services/properties/updateProperty.js";
import deleteProperty from "../services/properties/deleteProperty.js";


const router = new express.Router();


router.get('/', async (req, res) => {
    const { id, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating } = req.query;
    const property = await getPropertiesByQuery(id, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating);
    res.status(200).json(property);
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const property = await getPropertiesById(id);
    res.status(200).json(property);
})

router.post('/', authMiddleware, async (req, res, next) => {
    try {
        const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating } = req.body;
        const newProperty = await createNewProperty(title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating);
        res.status(201).json(newProperty);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler)

router.put('/:id', authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating } = req.body;
        const updatedProperty = await updateProperty(id, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating);
        res.status(200).json(updatedProperty);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler)

router.delete('/:id', authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProperty = await deleteProperty(id);
        res.status(200).json(deletedProperty);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler)

export default router;
