import { getJson } from "@/util/requests";

export const fetchStash = async () => {
  const url = `flavors/stash`;
  const stash = await getJson(url);
  return stash.data;
};
