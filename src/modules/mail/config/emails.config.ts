import { EmailTemplate } from '../enums/email-template.enum';

export const emailConfig = {
  resetPassword: {
    template: EmailTemplate.ResetPassword,
    subject: 'Reset Your Password',
    resetPagePath: '/reset-password',
  },
};
