import express from "express"
import { bookActivity, getMyBookings, cancelBooking } from "../controllers/booking.controller.js"
import { authenticate } from "../middleware/auth.middleware.js"

const router = express.Router()

// All booking routes are protected
router.use(authenticate)

// Book an activity
router.post("/", bookActivity)

// Get all bookings for logged in user
router.get("/my-bookings", getMyBookings)

// Cancel a booking
router.delete("/:id", cancelBooking)

export default router
