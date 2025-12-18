import React from "react";

function Editor({ imageEditingOptions, setImageEditingOptions }) {
  return (
    <div className="flex h-full w-120 flex-col gap-2 overflow-y-auto border-l border-white/10 bg-white/2 p-4">
      {imageEditingOptions.map((option, index) => (
        <div key={index} className="border-b border-white/10 py-2">
          <label className="mb-2 flex justify-between">
            <span>{option.name}</span>

            <span className="mt-1 text-sm">
              {option.value}
              {option.unit}
            </span>
          </label>

          <input
            type="range"
            min={option.min}
            max={option.max}
            value={option.value}
            className="w-full cursor-pointer accent-zinc-300"
            onChange={(e) => {
              const newValue = parseInt(e.target.value, 10);
              setImageEditingOptions((prevOptions) => {
                const updatedOptions = [...prevOptions];
                updatedOptions[index] = {
                  ...updatedOptions[index],
                  value: newValue,
                };
                return updatedOptions;
              });
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Editor;
