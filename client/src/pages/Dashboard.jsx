import { Link, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAuthContext from "../hooks/useAuthContext";
import { logoutUser } from "../services/authService";
import { getRecentWhiteboards } from "../services/whiteboardService";

function Dashboard() {
  useAuth();
  const { user, setUser } = useAuthContext();
  const [roomId, setRoomId] = useState("");
  const [recentRooms, setRecentRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRecentRooms = async () => {
      try {
        const savedBoards = await getRecentWhiteboards();
        setRecentRooms(savedBoards);
      } catch {
        setRecentRooms([]);
      }
    };

    loadRecentRooms();
  }, []);

  const handleCreateRoom = () => {
    navigate(`/whiteboard/${nanoid(6)}`);
  };

  const handleJoinRoom = () => {
    let input = roomId.trim();

    if (!input) return;

    // If a full URL is pasted, extract the room ID
    if (input.startsWith("http")) {
      const parts = input.split("/");
      input = parts[parts.length - 1];
    }

    navigate(`/whiteboard/${input}`);
  };

  const handleJoinOnEnter = (e) => {
    if (e.key === "Enter") {
      handleJoinRoom();
    }
  };

  const handleLogout = async () => {
    await logoutUser();

    setUser(null);
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-[#f7f8fb] bg-[linear-gradient(#eef1f5_1px,transparent_1px),linear-gradient(90deg,#eef1f5_1px,transparent_1px)] bg-size-[32px_32px] text-slate-950">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-lg font-black text-white">
            W
          </span>
          <span className="text-lg font-semibold tracking-normal">
            WorkBoard
          </span>
        </Link>

        <h1>Welcome {user?.name}</h1>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-950 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-950 hover:text-white"
        >
          Logout
        </button>
      </nav>

      <section className="mx-auto w-full max-w-6xl px-6 pb-10 pt-8">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
            Dashboard
          </p>
          <h1 className="text-4xl font-black tracking-normal text-slate-950">
            Your WorkBoard rooms
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Create a fresh board or join an existing room with its room ID.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl bg-white p-5 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200">
            <button
              type="button"
              onClick={handleCreateRoom}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              <span aria-hidden="true">+</span>
              Create Room
            </button>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                onKeyDown={handleJoinOnEnter}
                className="min-h-12 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 text-base font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
              <button
                type="button"
                onClick={handleJoinRoom}
                className="min-h-12 rounded-lg bg-slate-950 px-6 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                Join
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">Recent rooms</h2>
              <span className="text-sm font-medium text-slate-500">
                {recentRooms.length} rooms
              </span>
            </div>

            <div className="space-y-3">
              {recentRooms.length === 0 && (
                <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                  Saved whiteboards will appear here.
                </p>
              )}

              {recentRooms.map((room) => (
                <button
                  key={room.roomId}
                  type="button"
                  onClick={() => navigate(`/whiteboard/${room.roomId}`)}
                  className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left transition hover:border-blue-200 hover:bg-white"
                >
                  <span>
                    <span className="block font-semibold text-slate-950">
                      {room.name}
                    </span>
                    <span className="mt-1 block text-sm text-slate-500">
                      Room ID: {room.roomId}
                    </span>
                  </span>
                  <span className="rounded-lg bg-white px-3 py-1 text-sm font-semibold text-slate-600 ring-1 ring-slate-200">
                    Saved
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
