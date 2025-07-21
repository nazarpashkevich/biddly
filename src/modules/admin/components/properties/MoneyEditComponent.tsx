import { FormGroup, FormMessage, Input } from '@adminjs/design-system';
import { PropertyLabel, useTranslation } from 'adminjs';
import React from 'react';

const MoneyEditComponent = ({ property, record, onChange }) => {
  const error = record.errors?.[property.path];
  const { tm } = useTranslation();

  const cents = record?.params?.[property.propertyPath];
  const value = cents != null ? (Number(cents) / 100).toFixed(2) : '';

  const handleChange = (event) => {
    const input = event.target.value;
    const float = parseFloat(input);

    if (!isNaN(float)) {
      onChange(property.propertyPath, Math.round(float * 100));
    } else {
      onChange(property.propertyPath, null);
    }
  };

  return (
    <FormGroup error={Boolean(record.errors?.[property.propertyPath])}>
      <PropertyLabel property={property} />
      <Input type="number" step="0.01" value={value} onChange={handleChange} />
      <FormMessage>
        {error && tm(error.message, property.resourceId)}
      </FormMessage>
    </FormGroup>
  );
};

export default MoneyEditComponent;
