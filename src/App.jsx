import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Editor from "./components/Editor";
import Upload from "./components/Upload";
import ImagePreview from "./components/ImagePreview";

function App() {
  const [imageEditingOptions, setImageEditingOptions] = useState([
    { name: "brightness", value: 100, min: 0, max: 200, unit: "%" },
    { name: "contrast", value: 100, min: 0, max: 200, unit: "%" },
    { name: "exposure", value: 100, min: 0, max: 200, unit: "%" },
    { name: "saturation", value: 100, min: 0, max: 200, unit: "%" },
    { name: "hue-rotate", value: 0, min: 0, max: 360, unit: "deg" },
    { name: "blur", value: 0, min: 0, max: 20, unit: "px" },
    { name: "grayscale", value: 0, min: 0, max: 100, unit: "%" },
    { name: "sepia", value: 0, min: 0, max: 100, unit: "%" },
    { name: "opacity", value: 100, min: 0, max: 100, unit: "%" },
    { name: "invert", value: 0, min: 0, max: 100, unit: "%" },
  ]);

  const [uploadedImage, setUploadedImage] = useState(null);

  const imageCanvasRef = useRef(null);
  const imageRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setUploadedImage(URL.createObjectURL(file));
  };

  /* Draw image on canvas */
  const drawImage = () => {
    if (!imageRef.current || !imageCanvasRef.current) return;

    const canvas = imageCanvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = imageRef.current.width;
    canvas.height = imageRef.current.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = "none";
    ctx.filter = buildFilterString();

    ctx.drawImage(imageRef.current, 0, 0);
  };

  /* Build canvas filter string */
  const buildFilterString = () => {
    const get = (name) =>
      imageEditingOptions.find((o) => o.name === name)?.value ?? 0;

    const brightness = get("brightness");
    const exposure = get("exposure");

    // Exposure simulated using brightness
    const combinedBrightness = (brightness * exposure) / 100;

    return `
      brightness(${combinedBrightness}%)
      contrast(${get("contrast")}%)
      saturate(${get("saturation")}%)
      hue-rotate(${get("hue-rotate")}deg)
      blur(${get("blur")}px)
      grayscale(${get("grayscale")}%)
      sepia(${get("sepia")}%)
      opacity(${get("opacity")}%)
      invert(${get("invert")}%)
    `;
  };

  /* Download image */
  const downloadImage = () => {
    if (!imageCanvasRef.current) return;

    const canvas = imageCanvasRef.current;

    const imageURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = `${Date.now()}_edited_image.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* Load image only once */
  useEffect(() => {
    if (!uploadedImage) return;

    const img = new Image();
    img.src = uploadedImage;

    img.onload = () => {
      imageRef.current = img;
      drawImage();
    };
  }, [uploadedImage]);

  /* Redraw on filter change */
  useEffect(() => {
    drawImage();
  }, [imageEditingOptions]);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-zinc-950 text-white/80">
      <Navbar downloadImage={downloadImage} uploadedImage={uploadedImage} />

      <main className="flex w-full flex-1 overflow-hidden">
        <div className="flex h-full grow items-center justify-center p-4">
          {uploadedImage ? (
            <ImagePreview ref={imageCanvasRef} />
          ) : (
            <Upload handleImageUpload={handleImageUpload} />
          )}
        </div>

        {uploadedImage && (
          <Editor
            imageEditingOptions={imageEditingOptions}
            setImageEditingOptions={setImageEditingOptions}
          />
        )}
      </main>
    </div>
  );
}

export default App;
