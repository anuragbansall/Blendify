import React, { forwardRef } from "react";

const ImagePreview = forwardRef(function ImagePreview(
  { uploadedImage, imageEditingOptions },
  canvasRef,
) {
  return (
    <canvas
      ref={canvasRef}
      className="max-h-full max-w-full rounded-md shadow-lg"
    />
  );
});

export default ImagePreview;
