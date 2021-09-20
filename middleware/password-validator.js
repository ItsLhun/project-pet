'use strict';

module.exports = (req, res, next) => {
  const { password, repeatPassword } = req.body;
  const minLength = password.length >= 8;
  const includesUppercaseChar = /[A-Z]/.test(password);
  const includesNumber = /\d/.test(password);
  if (password !== repeatPassword) {
    throw new Error('PASSWORDS_DO_NOT_MATCH');
  } else if (!minLength) {
    throw new Error('PASSWORD_TOO_SHORT');
  } else if (!includesUppercaseChar) {
    throw new Error('PASSWORD_CONTAINS_NO_UPPERCASE');
  } else if (!includesNumber) {
    throw new Error('PASSWORD_CONTAINS_NO_NUMBER');
  }
};
