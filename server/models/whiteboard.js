
import mongoose from "mongoose";

const whiteboardSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
    },
    shapes: {
      type: Array,
      default: [],
    },
    name: {
      type: String,
      default: "Untitled board",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isSaved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Whiteboard = mongoose.model("Whiteboard", whiteboardSchema);
export default Whiteboard;
