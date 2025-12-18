import React from "react";

function Navbar({ downloadImage, uploadedImage }) {
  return (
    <div className="flex w-full shrink-0 items-center justify-between bg-zinc-900 p-4">
      <h2 className="text-2xl font-semibold">Blendify</h2>

      {uploadedImage && (
        <button
          onClick={downloadImage}
          className="mt-2 cursor-pointer rounded bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700"
        >
          Download Image
        </button>
      )}
    </div>
  );
}

export default Navbar;
