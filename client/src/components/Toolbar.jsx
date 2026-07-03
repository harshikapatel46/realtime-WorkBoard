const tools = ["Pencil", "Line", "Rectangle", "Circle", "Select", "Text"];

function Toolbar({
  tool,
  setTool,
  handleUndo,
  handleRedo,
  handleDelete,
  color,
  setColor,
  onTextTool,
  onShare,
  onSave,
  saveLabel = "Save",
}) {
  return (
    <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/98 px-4 py-3 shadow-lg backdrop-blur">
        <div className="flex gap-2">
          {tools.map((item) => (
            <button
              key={item}
              onClick={() => {
                setTool(item);

                if (item === "Text" && typeof onTextTool === "function") {
                  onTextTool();
                }
              }}
              title={item}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                tool === item
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="h-6 w-px bg-slate-300" />

        <div className="flex gap-2">
          <button
            onClick={handleUndo}
            title="Undo"
            className="rounded-lg px-3 py-2 text-sm font-medium bg-slate-100 text-slate-700 transition hover:bg-slate-200"
          >
            Undo
          </button>
          <button
            onClick={handleRedo}
            title="Redo"
            className="rounded-lg px-3 py-2 text-sm font-medium bg-slate-100 text-slate-700 transition hover:bg-slate-200"
          >
            Redo
          </button>
        </div>

        <div className="h-6 w-px bg-slate-300" />

        <button
          onClick={handleDelete}
          title="Delete"
          className="rounded-lg px-3 py-2 text-sm font-medium bg-red-100 text-red-600 transition hover:bg-red-200"
        >
          Delete
        </button>

        <div className="h-6 w-px bg-slate-300" />

        <div className="flex items-center gap-2">
          <label
            htmlFor="color-picker"
            className="text-sm font-medium text-slate-600"
          >
            Color:
          </label>
          <input
            id="color-picker"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-9 w-12 cursor-pointer rounded-lg border border-slate-300 bg-white p-1 transition hover:border-slate-400"
          />
        </div>

        <div className="h-6 w-px bg-slate-300" />

        <button
          onClick={onShare}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
        >
          Share
        </button>

        <button
          onClick={onSave}
          className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95"
        >
          {saveLabel}
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
