import { getJson, postJson } from "@/util/requests";

export const login = async ({ username, password, onFailure, onSuccess }) => {
  const res = await postJson("auth/authenticate", {
    data: { username, password },
    onFailure,
    alert: false
  });
  if (res.statusCode !== 200) onFailure && onFailure(res);
  else onSuccess && onSuccess(res);
};

export const register = async ({
  username,
  email,
  password,
  passwordC,
  onFailure,
  onSuccess
}) => {
  const res = await postJson("auth/register", {
    data: { username, email, password, passwordC },
    onFailure
  });
  if (res.statusCode !== 201) onFailure && onFailure(res.data);
  else onSuccess && onSuccess(res.data);
};

export const searchUsers = async username => {
  const res = await getJson(`users/search`, {
    params: { username },
    onFailure: () => console.log("Failed to search users")
  });
  return (res && res.data) || [];
};

export const fetchUser = async id => {
  const res = await getJson(`user/${id}`, { onFailure: console.log });
  return res && res.data;
};

export const fetchUserStats = async id => {
  const res = await getJson(`user/${id}/stats`, { onFailure: console.log });
  return res && res.data;
};
