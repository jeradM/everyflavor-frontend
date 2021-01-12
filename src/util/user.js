import { getJson } from "@/util/requests";

export const searchUsers = async (username) => {
  const res = await getJson(`users/search`, { username }, () =>
    console.log("Failed to search users")
  );
  return (res && res.data) || [];
};

export const fetchUser = async (id) => {
  const res = await getJson(`user/${id}`, null, console.log);
  return res && res.data;
};

export const fetchUserStats = async (id) => {
  const res = await getJson(`user/${id}/stats`, null, console.log);
  return res && res.data;
};
