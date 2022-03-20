import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Mounty").required(),
    lastName: Joi.string().example("Burns").required(),
    email: Joi.string().email().example("mounty@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const PlaceSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Alpe d'Huez"),
    location: Joi.string().required().example("France"),
    category: Joi.string().required().example("Cat 1"),
    longitude: Joi.number().allow("").optional().example(12),
    latitude: Joi.number().allow("").optional().example(12),
    placeMarkid: IdSpec,
  })
  .label("Place");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const PlaceMarkSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("France"),
    userid: IdSpec,
  })
  .label("PlaceMark");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};
