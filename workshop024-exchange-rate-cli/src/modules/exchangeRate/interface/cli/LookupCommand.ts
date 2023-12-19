import { GluegunParameters, GluegunToolbox } from "gluegun";
import { Err, Ok, Result } from "ts-results";
import { FetchExchangeRate } from "../../domain/FetchExchangeRate";
import { getCurrencyNameByCode } from "../../../../lib/i18n/GetCurrencyNameByCode";

type LookupParameters = {
  from: string;
  to: string;
};

const validateLookupParameters = (
  parameters: GluegunParameters
): Result<LookupParameters, Error> => {
  if (!parameters.options.from) {
    const error = new Error("No source currency specified (--from)");

    return Err(error);
  }

  if (!parameters.options.to) {
    const error = new Error("No destination currency specified (--to)");

    return Err(error);
  }

  return Ok({
    from: parameters.options.from,
    to: parameters.options.to,
  });
};

type Dependencies = {
  fetchExchangeRate: FetchExchangeRate;
};

export const makeExchangeRateLookupCommand =
  ({ fetchExchangeRate }: Dependencies) =>
  async ({ print, parameters }: GluegunToolbox) => {
    const parameterValidationResult = validateLookupParameters(parameters);

    if (parameterValidationResult.err) {
      print.error(parameterValidationResult.val.message);
      process.exit(1);
    }

    const { from, to } = parameterValidationResult.val;

    const spinner = print.spin(`Fetching ${from}-${to} exchange rate...`);

    const rate = await fetchExchangeRate({
      fromCurrency: from,
      toCurrency: to,
    });

    spinner.stop();

    const tableHeaders = [
      "Conversion",
      "Value",
      "Maximum",
      "Minimum",
      "Updated At",
    ];

    const conversionHeader = `From ${getCurrencyNameByCode(
      rate.fromCurrency
    )} (${print.colors.bold(rate.fromCurrency)}) to ${getCurrencyNameByCode(
      rate.toCurrency
    )} (${print.colors.bold(rate.toCurrency)})`;

    print.table(
      [
        tableHeaders.map((header) => print.colors.bold(header)),
        [
          conversionHeader,
          print.colors.blue(rate.value.toString()),
          print.colors.green(rate.maximum.toString()),
          print.colors.red(rate.minimum.toString()),
          rate.updatedAt.toLocaleString(),
        ],
      ],
      { format: "lean" }
    );
  };

export type ExchangeRateLookupCommand = ReturnType<
  typeof makeExchangeRateLookupCommand
>;
