const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName,userName,emailId, Password } = req.body;
  if (!firstName || !lastName ||!userName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(Password)) {
    throw new Error("Please enter a strong Password!");
  }
};
module.exports = {
    validateSignUpData
}