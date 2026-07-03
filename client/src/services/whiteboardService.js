import { API_BASE_URL } from "../config/api";

export async function saveWhiteboard(roomId, shapes) {
  const response = await fetch(
    `${API_BASE_URL}/api/whiteboards/${roomId}/save`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: `Board ${roomId}`,
        shapes,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to save whiteboard.");
  }

  return data.board;
}

export async function getRecentWhiteboards() {
  const response = await fetch(`${API_BASE_URL}/api/whiteboards/recent`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load recent whiteboards.");
  }

  return data.boards;
}
