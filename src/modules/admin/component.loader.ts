export function initComponentLoader(componentLoader) {
  return {
    MoneyListComponent: componentLoader.add(
      'MoneyListComponent',
      './components/properties/MoneyListComponent'
    ),
    MoneyEditComponent: componentLoader.add(
      'MoneyEditComponent',
      './components/properties/MoneyEditComponent'
    ),
    MoneyShowComponent: componentLoader.add(
      'MoneyShowComponent',
      './components/properties/MoneyShowComponent'
    ),
  };
}
