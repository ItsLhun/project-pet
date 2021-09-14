'use strict';

module.exports = (req, res, next) => {
  const { password, repeatPassword } = req.body;
  const minLength = password.length >= 8;
  const includesUppercaseChar = /[A-Z]/.test(password);
  const includesNumber = /\d/.test(password);
  if (password !== repeatPassword) {
    const error = new Error('PASSWORDS_DO_NOT_MATCH');
    next(error);
  } else if (!minLength) {
    const error = new Error('PASSWORD_TOO_SHORT');
    next(error);
  } else if (!includesUppercaseChar) {
    const error = new Error('PASSWORD_CONTAINS_NO_UPPERCASE');
    next(error);
  } else if (!includesNumber) {
    const error = new Error('PASSWORD_CONTAINS_NO_NUMBER');
    next(error);
  } else {
    next();
  }
};
