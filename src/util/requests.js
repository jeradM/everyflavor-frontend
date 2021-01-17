import { API_URL } from "@/config";
import { unauthorized } from "@/store/index";
import notify from "@/notifications";

export const getJson = async (url, opts = {}) => {
  let _url = new URL(`${API_URL}/${url}`);
  if (opts && opts.params !== null)
    _url.search = new URLSearchParams(opts.params).toString();
  const resp = await fetch(_url, { credentials: "include" });
  const data = await resp.json();
  if (resp.ok) return data;
  handleError(resp.status, data, opts);
};

export const postJson = async (url, opts = {}) => {
  if (opts.alert !== false) opts.alert = true;
  debugger;
  const _url = url.startsWith("http") ? url : `${API_URL}/${url}`;
  const resp = await fetch(_url, {
    method: opts.method || "post",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(opts.data)
  });
  const data = await resp.json();
  if (resp.ok) return data;
  handleError(resp.status, data, opts);
};

const handleError = (statusCode, data, opts) => {
  let msg = data.msg;
  if (statusCode === 401) {
    unauthorized();
    msg = "You must be logged in to do that";
  } else if (statusCode === 403) {
    msg = "You aren't allowed to do that";
  }
  if (msg && opts.alert) notify.error(msg);
  const callback = opts.onFailure;
  if (callback && callback.call && callback.apply) callback(data);
};
