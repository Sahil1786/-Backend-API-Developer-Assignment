import Joi from "joi"

// User registration validation
export const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().required().email(),
    phone: Joi.string()
      .required()
      .pattern(/^[0-9]{10}$/),
    password: Joi.string().required().min(6),
  })

  return schema.validate(data)
}

// User login validation
export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  })

  return schema.validate(data)
}

// Activity validation
export const activityValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(10),
    location: Joi.string().required(),
    date: Joi.date().required().iso(),
    time: Joi.string()
      .required()
      .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  })

  return schema.validate(data)
}

// Booking validation
export const bookingValidation = (data) => {
  const schema = Joi.object({
    activityId: Joi.string()
      .required()
      .pattern(/^[0-9a-fA-F]{24}$/),
  })

  return schema.validate(data)
}
