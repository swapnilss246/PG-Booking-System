import validator from 'validator';


const uservalidation = (values) => {
  let errors = {};
  // var pattern = new RegExp(/^[0-9\b]+$/);
  // const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  if (!values.name) {
    errors.name = "Name is required";
  } else if (!isNaN(values.name)) {
    errors.name = "only characters are allowed";
  }

  if (!values.city) {
    errors.city = "City is required";
  } else if (!isNaN(values.city)) {
    errors.city = "only characters are allowed";
  }

  if (!values.email) {
    errors.email = "Email is required!";
  } else if (values.email.indexOf("@") <= 0) {
    errors.email = "Invalid @ position";
  } else if (
    values.email.charAt(values.email.length - 4) !== "." &&
    values.email.charAt(values.email.length - 3) !== "."
  ) {
    errors.email = "Invalid . position";
  }

  const today = new Date();

  if(new Date(values.dateOfBirth) >= today){
      errors.dateOfBirth = "Date of Birth must be a past date!!!"
  }

  if (!values.phone) {
    errors.phone = "Phone no is required";
  } else if (values.phone.length !== 10) {
    errors.phone = "Only 10 digits are allowed";
  }

  if (validator.isStrongPassword(values.password, {
    minLength: 8, minLowercase: 1,
    minUppercase: 1, minNumbers: 1, minSymbols: 1
  })) {
  } else {
    errors.password = "Min Password length should be 8 and must contain atleast 1 uppercase, lowercase, number and special character ";
  }


  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  }

  if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password did not match";
  }

  return errors;
}
export default uservalidation;
