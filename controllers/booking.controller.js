import Booking from "../models/booking.model.js"
import Activity from "../models/activity.model.js"
import { bookingValidation } from "../utils/validation.js"

// Book an activity
export const bookActivity = async (req, res) => {
  try {
    // Validate request body
    const { error } = bookingValidation(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      })
    }

    // Check if activity exists
    const activity = await Activity.findById(req.body.activityId)
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      })
    }

    // Check if user already booked this activity
    const existingBooking = await Booking.findOne({
      user: req.user._id,
      activity: req.body.activityId,
    })

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "You have already booked this activity",
      })
    }

    // Create new booking
    const booking = new Booking({
      user: req.user._id,
      activity: req.body.activityId,
    })

    // Save booking to database
    const savedBooking = await booking.save()

    // Populate activity details
    await savedBooking.populate("activity")

    res.status(201).json({
      success: true,
      message: "Activity booked successfully",
      data: savedBooking,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error booking activity",
      error: error.message,
    })
  }
}

// Get all bookings for logged in user
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("activity").sort({ bookingDate: -1 })

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: error.message,
    })
  }
}

// Cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id,
    })

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found or not authorized",
      })
    }

    await booking.deleteOne()

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error cancelling booking",
      error: error.message,
    })
  }
}
