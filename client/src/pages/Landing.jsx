import { Link, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useState } from "react";

function Landing() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoomId = nanoid(6);
    navigate(`/whiteboard/${newRoomId}`);
  };

  const handleJoinRoom = () => {
    const input = roomId.trim();

    if (!input) return;

    let nextRoomId = input;

    // If a full share link is pasted, extract the room ID
    if (input.includes("/whiteboard/")) {
      nextRoomId = input.split("/whiteboard/").pop();
    }

    navigate(`/whiteboard/${nextRoomId}`);
  };

  const handleJoinOnEnter = (e) => {
    if (e.key === "Enter") {
      handleJoinRoom();
    }
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

        <div className="flex items-center gap-3 text-sm font-medium">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-slate-600 transition hover:bg-white hover:text-slate-950"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-white px-4 py-2 text-slate-950 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-950 hover:text-white"
          >
            Register
          </Link>
        </div>
      </nav>

      <section className="mx-auto flex min-h-[calc(100vh-82px)] w-full max-w-4xl items-center justify-center px-6 pb-10 pt-4">
        <div className="w-full max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
            Live rooms for shared thinking
          </p>
          <h1 className="text-5xl font-black leading-tight tracking-normal text-slate-950 sm:text-6xl">
            WorkBoard
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Start a clean room, invite teammates, and sketch ideas together with
            shapes, pencil notes, text, undo, and live updates.
          </p>

          <div className="mt-8 rounded-xl bg-white p-4 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200">
            <button
              type="button"
              onClick={handleCreateRoom}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
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
                Join Room
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;
