export const getCurrencyNameByCode = (currency: string) => {
  const translation = new Intl.DisplayNames(["en"], { type: "currency" });

  return translation.of(currency);
};
