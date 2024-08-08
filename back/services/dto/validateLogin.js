const { Type } = require("@sinclair/typebox"); // importamos Type de la libreria "@sinclair/typebox"
const Ajv = require("ajv"); // importamos la librería ajv
const addFormats = require('ajv-formats'); // importamos los paquetes que extienden la funcionalidad de ajv
const addErrors = require('ajv-errors');

// Componemos el esquema usando la librería con la propiedad Type
const LoginDTOSchema = Type.Object({
    name: Type.String(),
    email: Type.String({
        format: 'email',
        errorMessage: {
            type: 'El tipo de email deber ser un string',
            format: 'Email debe contener un correo electrónico válido'
    }}),
    password: Type.String({
        minLength: 8,
        pattern: '(?=.*[A-Z])(?=.*[0-9])',
        errorMessage:{
            type: 'El tipo de password debe ser un string',
            minLength: 'La contraseña debe tener al menos 8 caracteres',
            pattern: 'La contraseña debe contener al menos una mayúscula y un número'
    }})
},{ additionalProperties: false,
    errorMessage: {
        type: 'Debe ser un objeto',
        additionalProperties: 'El formato del objeto no es válido',
        required: {
          email: 'El email es requerido',
          password: 'La password es requerida',
        }
      }  
});


const ajv = new Ajv({ allErrors: true });

addFormats(ajv,['email']);

addErrors(ajv,{ keepErrors: false });

const validate = ajv.compile(LoginDTOSchema);

const validateLoginDto = (req, res, next) => {
    const isDTOValid = validate(req.body);
    if (!isDTOValid) return res.status(400).send(ajv.errorsText(validate.errors, { separator: '\n' }));
    next();
}
  
module.exports = validateLoginDto
  