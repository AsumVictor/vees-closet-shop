function isStrongPassword(password) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
  
    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumbers &&
      hasSpecialChars
    );
  }
  
  module.exports = isStrongPassword