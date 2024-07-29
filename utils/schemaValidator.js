module.exports = (schema, item) => {
  for (var key in schema) {
    if (!schema[key].required && !(key in item)) continue;

    if (!(key in item)) {
      throw new Error(`The ${key} field is required.`);
    }

    if (typeof item[key] !== schema[key].type) {
      throw new Error(
        `The ${key} field needs to be of type ${schema[key].type}.`
      );
    }
  }
};
