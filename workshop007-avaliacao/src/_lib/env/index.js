const getEnvValue = (parser) => (key, fallback) => {
  const value = process.env[key];

  if (!value) {
    if (fallback === undefined) {
      throw Error(`Missing key ${key} from env and no fallback was provided`);
    }

    return fallback;
  }

  return parser(value);
};

const Env = {
  string: getEnvValue(String),
  number: getEnvValue(Number),
};

module.exports = { Env };
