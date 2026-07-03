const STROKE_HIT_TOLERANCE = 6;

export function isPointerOnRectStroke(pointer, shape) {
  const left = Math.min(shape.x, shape.x + shape.width);
  const right = Math.max(shape.x, shape.x + shape.width);
  const top = Math.min(shape.y, shape.y + shape.height);
  const bottom = Math.max(shape.y, shape.y + shape.height);

  const withinX = pointer.x >= left - STROKE_HIT_TOLERANCE && pointer.x <= right + STROKE_HIT_TOLERANCE;
  const withinY = pointer.y >= top - STROKE_HIT_TOLERANCE && pointer.y <= bottom + STROKE_HIT_TOLERANCE;
  const nearVerticalEdge =
    Math.abs(pointer.x - left) <= STROKE_HIT_TOLERANCE ||
    Math.abs(pointer.x - right) <= STROKE_HIT_TOLERANCE;
  const nearHorizontalEdge =
    Math.abs(pointer.y - top) <= STROKE_HIT_TOLERANCE ||
    Math.abs(pointer.y - bottom) <= STROKE_HIT_TOLERANCE;

  return (nearVerticalEdge && withinY) || (nearHorizontalEdge && withinX);
}

export function isPointerOnCircleStroke(pointer, shape) {
  const distanceFromCenter = Math.hypot(pointer.x - shape.x, pointer.y - shape.y);

  return Math.abs(distanceFromCenter - shape.radius) <= STROKE_HIT_TOLERANCE;
}
