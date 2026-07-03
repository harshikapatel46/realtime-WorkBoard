import Whiteboard from "../models/whiteboard.js";

export const saveWhiteboard = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { shapes = [], name } = req.body;

    const board = await Whiteboard.findOneAndUpdate(
      { roomId },
      {
        roomId,
        shapes,
        name: name || `Board ${roomId}`,
        owner: req.user.id,
        isSaved: true,
      },
      {
        new: true,
        upsert: true,
      },
    );

    return res.status(200).json({
      message: "Whiteboard saved successfully",
      board,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to save whiteboard",
      error: error.message,
    });
  }
};

export const getRecentWhiteboards = async (req, res) => {
  try {
    const boards = await Whiteboard.find({
      owner: req.user.id,
      isSaved: true,
    })
      .sort({ updatedAt: -1 })
      .limit(10);

    return res.status(200).json({ boards });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to load recent whiteboards",
      error: error.message,
    });
  }
};
