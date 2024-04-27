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

export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  const timezoneOffset = -date.getTimezoneOffset();
  const offsetHours = String(Math.abs(Math.floor(timezoneOffset / 60))).padStart(2, '0');
  const timezoneSign = timezoneOffset >= 0 ? "+" : "-";
  
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneSign}${offsetHours}:00`;
  
  return formattedDate;
};
