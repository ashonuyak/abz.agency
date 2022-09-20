import Joi from 'joi'

export const UserSchema = Joi.object({
  name: Joi.string().min(2).max(60).required().label('Name').messages({
    'string.name': 'Name is invalid.',
    'string.empty': 'Name cannot be an empty field.',
    'string.min': 'Name must be at least 2 characters.',
    'string.max': 'Name must not exceed 60 characters.',
    'any.required': 'Name field is required.',
  }),
  email: Joi.string()
    .min(2)
    .max(100)
    .pattern(
      new RegExp(
        '^(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])$'
      )
    )
    .required()
    .label('Email')
    .messages({
      'string.pattern.base': 'Email must be a valid email address.',
      'string.empty': 'Email cannot be an empty field.',
      'string.min': 'Email must be at least 2 characters.',
      'string.max': 'Email must not exceed 100 characters.',
      'any.required': 'Email field is required.',
    }),
  phone: Joi.string()
    .pattern(new RegExp('^[+]{0,1}380([0-9]{9})$'))
    .required()
    .label('Phone')
    .messages({
      'string.pattern.base': 'Phone is invalid.',
      'string.empty': 'Phone cannot be an empty field.',
      'any.required': 'Phone field is required.',
    }),
  position: Joi.number().required().label('Position').messages({
    'number.position': 'Position is invalid.',
    'number.base': 'Position cannot be an empty field.',
    'number.empty': 'Position cannot be an empty field.',
    'any.required': 'Position field is required.',
  }),
})

export const GetUsersSchema = Joi.object({
  page: Joi.number().min(1).messages({
    'number.base': 'Page must be an integer.',
    'number.min': 'Page must be at least 1.',
  }),
  offset: Joi.number().min(0).messages({
    'number.base': 'Offset must be an integer.',
    'number.min': 'Offset must be at least 1.',
  }),
  count: Joi.number().min(1).max(100).messages({
    'number.base': 'Count must be an integer.',
    'number.min': 'Count must be at least 1.',
    'number.max': 'Count must not exceed 100.',
  }),
})

export const GetUserSchema = Joi.object({
  id: Joi.string().min(1).required().messages({
    'string.base': 'Id must be a string.',
    'string.min': 'Id must be at least 1 characters long.',
    'any.required': 'Id field is required.',
  }),
})
