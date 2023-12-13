import { container } from "./container";

container
  .fetchExchangeRate({ fromCurrency: "USD", toCurrency: "BRL" })
  .then((data) => console.log(data));
