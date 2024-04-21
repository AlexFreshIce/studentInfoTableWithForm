export const parseDate = (string) => {
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(string).toLocaleString("ru-RU", options);
};