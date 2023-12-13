export namespace ExchangeRate {
  export type Type = {
    fromCurrency: string;
    toCurrency: string;
    value: number;
    maximum: number;
    minimum: number;
    updatedAt: Date;
  };
}
