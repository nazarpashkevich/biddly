export const AuthConstants = {
  password: {
    saltRounds: 10,
  },
  validation: {
    passwordRegex:
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
    emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phoneRegex: /^\d{1,3}\d{10}$/,
  },
};
