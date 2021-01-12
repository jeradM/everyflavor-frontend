const scheme = location.protocol;
const BACKEND_HOST =
  process.env.NODE_ENV === "production" ? location.host : "localhost:8099";
const API_HOST = `${BACKEND_HOST}/api/v1`;

export const BACKEND_URL = `${scheme}//${BACKEND_HOST}`;
export const API_URL = `${scheme}//${API_HOST}`;
