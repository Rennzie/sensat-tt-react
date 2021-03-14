export const sortByDate = (data, properties, sortDirection = "asc", defaultValue = void 0) => {
  if (!data)
    return defaultValue;
  const isAsc = sortDirection === "asc";
  return data.sort((a, b) => {
    const dateA = a[properties];
    const dateB = b[properties];
    console.log({dateA, dateB});
    if (isAsc)
      return dateA - dateB;
    return dateA - dateB;
  });
};
export const sortByString = (data, properties, sortDirection = "asc", defaultValue = void 0) => {
  if (!data)
    return defaultValue;
  const isAsc = sortDirection === "asc";
  return data.sort((a, b) => {
    const stringA = a[properties].toLowerCase();
    const stringB = b[properties].toLowerCase();
    if (isAsc)
      return stringA > stringB ? 1 : -1;
    return stringA < stringB ? 1 : -1;
  });
};
