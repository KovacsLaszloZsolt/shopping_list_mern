const updateIsValidFields = (validFields: string[], updateFields: string[]): boolean => {
  return updateFields.every((field) => validFields.includes(field));
};

export default updateIsValidFields;
