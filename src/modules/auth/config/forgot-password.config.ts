export const forgotPasswordConfig = {
  // Length of the generated reset token in bytes (will be converted to hex string, so final length is tokenLength * 2)
  tokenLength: 32,

  // Token expiration time in milliseconds (1 hour)
  tokenExpiresIn: 1000 * 60 * 60,
};
