import api from "./api";
export const login = (data: { username: string; password: string }) => {
  return api.post("/auth/login", data);
};
export const register = (data: {
  username: string;
  password: string;
}) => {
  return api.post("/auth/register", data);
};