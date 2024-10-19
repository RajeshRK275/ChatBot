import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // in seconds
  return decodedToken.exp < currentTime; // Check if token has expired
};

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  console.log("Token ->", token);

  if (token && !isTokenExpired(token)) {
    const decodedToken = jwtDecode(token);
    return decodedToken.id;
  }
  return null;
};
