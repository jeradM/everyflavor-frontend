import Joi from "joi";

const flavorsSchema = Joi.object({
  flavorId: Joi.number()
    .positive()
    .integer()
    .required(),
  percentM: Joi.number().min(0)
}).unknown();

const schema = Joi.object({
  title: Joi.string()
    .required()
    .trim()
    .messages({
      "string.empty": "Name is required",
      "any.required": "Name is required"
    }),
  description: Joi.string()
    .required()
    .trim()
    .messages({
      "string.empty": "Description is required",
      "any.required": "Description is required"
    }),
  flavors: Joi.array()
    .min(1)
    .items(flavorsSchema)
    .messages({
      "array.min": "No flavors added"
    }),
  public: Joi.boolean(),
  snv: Joi.boolean(),
  steepDays: Joi.number()
    .integer()
    .min(0)
    .strict()
    .messages({
      "number.base": "Steep Days must be a positive integer",
      "number.min": "Steep Days must be a positive integer",
      "number.integer": "Steep Days must be a positive integer"
    }),
  temp: Joi.number()
    .integer()
    .min(0)
    .strict()
    .messages({
      "number.base": "Best Temp must be a positive integer",
      "number.min": "Best Temp must be a positive integer",
      "number.integer": "Best Temp must be a positive integer"
    }),
  vgPercent: Joi.number()
    .integer()
    .min(0)
    .strict()
    .messages({
      "number.base": "Best VG % must be a positive integer",
      "number.min": "Best VG % must be a positive integer",
      "number.integer": "Best VG % must be a positive integer"
    }),
  wip: Joi.boolean()
}).unknown();

export default recipe => {
  return schema.validate(recipe, { abortEarly: false });
};
