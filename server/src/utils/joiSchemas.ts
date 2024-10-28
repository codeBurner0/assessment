import Joi from 'joi'

export const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  color: Joi.string().required(),
  colorIcon: Joi.string().required(),
  imageUrl: Joi.string().allow(''),
  phoneNumber1: Joi.string().length(10).pattern(/^\d+$/).required(),
  phoneNumber2: Joi.string().length(10).pattern(/^\d+$/).optional(),
  address: Joi.string().required(),
})
