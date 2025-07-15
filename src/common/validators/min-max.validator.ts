import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'MinMax', async: false })
export class MinMaxValidation implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [maxPropertyName] = args.constraints;
    const maxValue = (args.object as any)[maxPropertyName];

    // If either value is not defined, skip validation
    if (value === undefined || maxValue === undefined) {
      return true;
    }

    // Check if min value is less than or equal to max value
    return Number(value) <= Number(maxValue);
  }

  defaultMessage(args: ValidationArguments) {
    const [maxPropertyName] = args.constraints;
    return `${args.property} must be less than or equal to ${maxPropertyName}`;
  }
}
