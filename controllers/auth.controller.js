import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import { registerValidation, loginValidation } from "../utils/validation.js"

// Register a new user
export const register = async (req, res) => {
  try {
    // Validate request body
    const { error } = registerValidation(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      })
    }

    // Check if user already exists
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      })
    }

    // Create new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    })

    // Save user to database
    const savedUser = await user.save()

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        userId: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    })
  }
}

// Login user
export const login = async (req, res) => {
  try {
    // Validate request body
    const { error } = loginValidation(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      })
    }

    // Check if user exists
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    // Check if password is correct
    const validPassword = await user.comparePassword(req.body.password)
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    // Create and assign token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "sahilhossain", { expiresIn: "24h" })

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          userId: user._id,
          name: user.name,
          email: user.email,
        },
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    })
  }
}
