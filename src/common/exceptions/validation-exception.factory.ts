import { BadRequestException, ValidationError } from '@nestjs/common';

export const validationExceptionFactory = (
  validationErrors: ValidationError[] = []
) => {
  const getPrettyClassValidatorErrors = (
    validationErrors: ValidationError[],
    parentProperty = ''
  ): Record<string, { property: string; errors: string[] }> => {
    const errors: Record<string, { property: string; errors: string[] }> = {};

    const getValidationErrorsRecursively = (
      validationErrors: ValidationError[],
      parentProperty = ''
    ) => {
      for (const error of validationErrors) {
        const propertyPath = parentProperty
          ? `${parentProperty}.${error.property}`
          : error.property;

        if (error.constraints) {
          errors[propertyPath] = {
            property: propertyPath,
            errors: Object.values(error.constraints),
          };
        }

        if (error.children?.length) {
          getValidationErrorsRecursively(error.children, propertyPath);
        }
      }
    };

    getValidationErrorsRecursively(validationErrors, parentProperty);

    return errors;
  };

  const errors = getPrettyClassValidatorErrors(validationErrors);

  return new BadRequestException({
    message: 'validation error',
    errors: errors,
  });
};
