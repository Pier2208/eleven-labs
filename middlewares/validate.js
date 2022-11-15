const Joi = require('joi');

// rules
const name = Joi.string().max(100).required().messages({
  'string.max': 'Le nom ne doit pas dépasser 100 caractères',
  'string.empty': 'Le nom est requis',
  'any.required': 'Le nom est requis'
});
const bio = Joi.string().allow('').max(500).messages({
  'string.max': 'La bio ne doit pas dépasser 500 caractères'
});
const teamId = Joi.number().required().messages({
  'string.empty': "Vous devez faire partie d'une équipe",
  'any.required': "Vous devez faire partie d'une équipe"
});
const image = Joi.allow('');

module.exports = {
  schemas: {
    astronautSchema: Joi.object().keys({
      name,
      bio,
      teamId,
      image
    })
  },
  validate: schema => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      let errors = {};
      error.details.forEach(error => {
        errors[error.path[0]] = error.message
      });
      next({ err: errors });
    }
    next();
  }
};
