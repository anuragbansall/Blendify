import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

function Upload({ uploadedImage, setUploadedImage, handleImageUpload }) {
  return (
    <div className="mx-auto flex h-60 w-full max-w-md flex-col items-center justify-center rounded-md border-2 border-dashed border-white/10 bg-white/2 duration-200 hover:border-white/20">
      <label className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white/2 text-3xl duration-200 hover:scale-105 hover:bg-white/4">
        <IoCloudUploadOutline />
        <input type="file" className="hidden" onChange={handleImageUpload} />
      </label>
      <span className="mt-4 text-center text-sm text-white/50">
        Click to upload an image
      </span>
    </div>
  );
}

export default Upload;
