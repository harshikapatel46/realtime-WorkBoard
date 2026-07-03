import { Transformer } from "react-konva";
import { useEffect, useRef } from "react";

function TransformerComponent({ selectedId, shapeRefs }) {
  const trRef = useRef(null);

  useEffect(() => {
    if (!trRef.current) return;

    if (selectedId) {
      const node = shapeRefs.current[selectedId];
      trRef.current.nodes(node ? [node] : []);
    } else {
      trRef.current.nodes([]);
    }

    trRef.current.getLayer()?.batchDraw();
  }, [selectedId, shapeRefs]);

  return <Transformer ref={trRef} />;
}

export default TransformerComponent;
