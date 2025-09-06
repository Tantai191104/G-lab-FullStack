import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().default(5000),
  MONGO_URI: Joi.string().uri().required(),
  MONGO_DB_NAME: Joi.string().min(1).required(),
});
