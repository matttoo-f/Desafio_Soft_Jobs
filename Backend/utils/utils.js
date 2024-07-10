// utils.js
import ERRORS from '../helpers/errors.js'

const findError = (code) => {
    return ERRORS.find((err) => err.code === code) || { status: 500, message: 'Error desconocido.' };
};

export  {findError};
