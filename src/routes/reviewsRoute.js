import express from "express";

//middleware
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';

//services import
import getReviewsById from "../services/reviews/getReviewsById.js";
import getReviewsByQuery from "../services/reviews/getReviewsByQuery.js";
import createNewReview from "../services/reviews/postNewReview.js";
import updateReview from "../services/reviews/updateReview.js";
import deleteReview from "../services/reviews/deleteReview.js";


const router = new express.Router();


router.get('/', async (req, res) => {
    const { id, userId, propertyId, rating, comment } = req.query;
    const review = await getReviewsByQuery(id, userId, propertyId, rating, comment);
    res.status(200).json(review);
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const review = await getReviewsById(id);
    res.status(200).json(review);
})

router.post('/', authMiddleware, async (req, res) => {
    const { userId, propertyId, rating, comment } = req.body;
    const newReview = await createNewReview(userId, propertyId, rating, comment);
    res.status(201).json(newReview);
})

router.put('/:id', authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, propertyId, rating, comment } = req.body;
        const updatedReview = await updateReview(id, userId, propertyId, rating, comment);
        res.status(200).json(updatedReview);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler)

router.delete('/:id', authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedReview = await deleteReview(id);
        res.status(200).json(deletedReview);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler)




export default router;
