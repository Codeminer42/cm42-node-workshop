const getEnvValue = (parser: (value: string) => unknown) => (key: string, fallback: string | number) => {
  const value = process.env[key];

  if (!value) {
    if (fallback === undefined) {
      throw Error(`Missing key ${key} from env and no fallback was provided`);
    }

    return fallback;
  }

  return parser(value);
};

export const Env = {
  string: getEnvValue(String),
  number: getEnvValue(Number),
};
