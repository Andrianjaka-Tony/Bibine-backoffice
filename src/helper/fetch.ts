import storage from "./storage";

export const statFetchOptions = () => ({
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem(storage.token),
  },
});
