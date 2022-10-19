import { formatISO9075 } from "date-fns";
import { formatRelative } from "date-fns/esm";
export const formatDate = (seconds) => {
  let formattedDate = "";

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
};
export const formatSecondsToDate = (seconds) => {
  let result = "";
  if (seconds) {
    result = formatISO9075(new Date(seconds * 1000));
  }
  return result;
};
