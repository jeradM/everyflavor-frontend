import { API_URL } from "@/config";
import { unauthorized } from "@/store/index";
import notify from "@/notifications";

export const getJson = async (url, params = null, f = null) => {
  let _url = new URL(`${API_URL}/${url}`);
  if (params !== null) _url.search = new URLSearchParams(params).toString();
  const resp = await fetch(_url, { credentials: "include" });
  const data = await resp.json();
  if (resp.ok) return data;
  handleError(resp.status, data, f);
};

export const postJson = async (url, data, f, method = "post") => {
  const _url = url.startsWith("http") ? url : `${API_URL}/${url}`;
  const resp = await fetch(_url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const respData = await resp.json();
  if (resp.ok) return respData;
  handleError(resp.status, respData, f);
};

const handleError = (statusCode, data, callback) => {
  if (statusCode === 401) unauthorized();
  const msg =
    statusCode === 403 ? "You aren't allowed to do that" : data.message;
  if (msg) notify.error(`Error: ${msg}`);
  if (callback && callback.call && callback.apply) callback(data);
};
