import axios from "axios";

export type AwesomeApiExchangeRate = {
  code: string;
  codein: string;
  high: string;
  low: string;
  ask: string;
  timestamp: string;
};

export const makeAwesomeApiExchangeRateSdk = () => {
  const apiClient = axios.create({
    baseURL: "https://economia.awesomeapi.com.br",
  });

  const lookup = ({
    from,
    to,
    quantity = 1,
  }: {
    from: string;
    to: string;
    quantity?: number;
  }): Promise<Array<AwesomeApiExchangeRate>> =>
    apiClient
      .get<Array<AwesomeApiExchangeRate>>(`/${from}-${to}/${quantity}`)
      .then(({ data }) => data);

  return { lookup };
};

export type AwesomeApiExchangeRateSdk = ReturnType<
  typeof makeAwesomeApiExchangeRateSdk
>;
