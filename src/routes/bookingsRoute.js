import express from "express";

//middleware
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';

//services import
import getBookingsById from "../services/bookings/getBookingsById.js";
import getBookingsByQuery from "../services/bookings/getBookingsByQuery.js";
import createNewBooking from "../services/bookings/postNewBooking.js";
import updateBooking from "../services/bookings/updateBooking.js";
import deleteBooking from "../services/bookings/deleteBooking.js";

const router = new express.Router();

router.get('/', async (req, res) => {
    const { id, userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.query;
    const booking = await getBookingsByQuery(id, userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus);
    res.status(200).json(booking);
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const booking = await getBookingsById(id);
    res.status(200).json(booking);
})

router.post('/', authMiddleware, async (req, res) => {
    const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
    const newBooking = await createNewBooking(userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus);
    res.status(201).json(newBooking);
})

router.put('/:id', authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
        const updatedBooking = await updateBooking(id, userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus);
        res.status(200).json(updatedBooking);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler)

router.delete('/:id', authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedBooking = await deleteBooking(id);
        res.status(200).json(deletedBooking);
    } catch (error) {
        next(error);
    }
}, notFoundErrorHandler)




export default router;
