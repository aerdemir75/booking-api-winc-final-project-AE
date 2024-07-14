import express from "express";

//middleware
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';

//services import
import getAmenityById from "../services/amenities/getAmenityById.js";
import getAmenityByQuery from "../services/amenities/getAmenityByQuery.js";
import createNewAmenity from "../services/amenities/postNewAmenity.js";
import updateAmenity from "../services/amenities/updateAmenity.js";
import deleteAmenity from "../services/amenities/deleteAmenity.js";

//Error middleware



const router = new express.Router();


router.get('/', async (req, res, next) => {
    try {
        const { id, name } = req.query;
        const amenity = await getAmenityByQuery(id, name);
        res.status(200).json(amenity);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler)

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const amenity = await getAmenityById(id);
        res.status(200).json(amenity);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler)

router.post('/', authMiddleware, async (req, res) => {
    const { name } = req.body;
    const newAmenity = await createNewAmenity(name);
    res.status(201).json(newAmenity);
})

router.put('/:id', authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedAmenity = await updateAmenity(id, name);
        res.status(200).json(updatedAmenity);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler)

router.delete('/:id', authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedAmenity = await deleteAmenity(id);
        res.status(200).json(deletedAmenity);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler)



export default router;
