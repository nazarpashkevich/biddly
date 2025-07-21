import { ValueGroup } from '@adminjs/design-system';
import { BasePropertyProps, useTranslation } from 'adminjs';
import React from 'react';

const MoneyShowComponent: React.FC<BasePropertyProps> = (props) => {
  const { property, record } = props;
  const { translateProperty } = useTranslation();

  const cents = record?.params?.[property.propertyPath];
  const value = cents != null ? (Number(cents) / 100).toFixed(2) : '';

  return (
    <ValueGroup label={translateProperty(property.label, property.resourceId)}>
      {value}
    </ValueGroup>
  );
};

export default MoneyShowComponent;
