import { API_BASE_URL } from "../config/api";

const authHeaders = {
  "Content-Type": "application/json",
};

async function sendAuthRequest(path, body) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: authHeaders,
    credentials: "include",
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data;
}

export function loginUser(credentials) {
  return sendAuthRequest("/api/auth/login", credentials);
}

export function registerUser(userDetails) {
  return sendAuthRequest("/api/auth/register", userDetails);
}

export function logoutUser() {
  return fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
