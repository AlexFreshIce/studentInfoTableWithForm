export const BASE_URL = "https://olegegoism.pythonanywhere.com";

export const ENDPOINTS = {
  HEADER: "/f_pers_young_spec/",
  LINES: "/nsi_pers_young_spec/",
  FORM_DATA: "/f_pers_young_spec_line/",
};

export const customFetch = async (
  endpoint = "",
  method = "GET",
  data = null,
  additionalHeaders = {}
) => {
  const url = BASE_URL + endpoint;
  const body = data ? JSON.stringify(data) : null;
  return await fetch(url, {
    method,
    body,
    headers: { "Content-Type": "application/json", ...additionalHeaders },
  });
};
