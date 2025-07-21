import React from 'react';

const MoneyListComponent = ({ property: { propertyPath }, record }) => {
  const cents = record?.params?.[propertyPath];
  const formatted = cents != null ? (Number(cents) / 100).toFixed(2) : '—';

  return <span>{formatted}</span>;
};

export default MoneyListComponent;
