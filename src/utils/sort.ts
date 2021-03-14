/** Sorts an array of objects with a date property */
export const sortByDate = (
  data: any[] | undefined,
  properties: string,
  sortDirection: 'asc' | 'desc' = 'asc',
  defaultValue: any = undefined,
): any[] => {
  if (!data) return defaultValue;
  const isAsc = sortDirection === 'asc';

  return data.sort((a, b) => {
    const dateA = new Date(a[properties]).getDate();
    const dateB = new Date(b[properties]).getDate();

    if (isAsc) return dateA - dateB;
    return dateB - dateA;
  });
};

export const sortByString = (
  data: any[] | undefined,
  properties: string,
  sortDirection: 'asc' | 'desc' = 'asc',
  defaultValue: any = undefined,
): any[] => {
  if (!data) return defaultValue;
  const isAsc = sortDirection === 'asc';

  return data.sort((a, b) => {
    const stringA = a[properties].toLowerCase();
    const stringB = b[properties].toLowerCase();

    if (isAsc) return stringA > stringB ? 1 : -1;
    return stringA < stringB ? 1 : -1;
  });
};
