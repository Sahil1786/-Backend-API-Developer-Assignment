import express from "express"
import { getAllActivities, getActivityById, createActivity } from "../controllers/activity.controller.js"
import { authenticate } from "../middleware/auth.middleware.js"

const router = express.Router()

// Public routes
router.get("/", getAllActivities)
router.get("/:id", getActivityById)

// Protected routes (would typically be admin-only in a real app)
router.post("/", authenticate, createActivity)

export default router
