import Activity from "../models/activity.model.js"
import { activityValidation } from "../utils/validation.js"

// Create a new activity (admin only in a real app)
export const createActivity = async (req, res) => {
  try {
    // Validate request body
    const { error } = activityValidation(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      })
    }

    // Create new activity
    const activity = new Activity({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      date: req.body.date,
      time: req.body.time,
    })

    // Save activity to database
    const savedActivity = await activity.save()

    res.status(201).json({
      success: true,
      message: "Activity created successfully",
      data: savedActivity,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating activity",
      error: error.message,
    })
  }
}

// Get all activities (public)
export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: 1 })

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching activities",
      error: error.message,
    })
  }
}

// Get single activity by ID
export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id)

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      })
    }

    res.status(200).json({
      success: true,
      data: activity,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching activity",
      error: error.message,
    })
  }
}
