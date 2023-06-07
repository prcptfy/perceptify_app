"use client"

import { useState, useRef } from "react";

export default function ProfileImageUpload() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState(null);

    return (
        <div
          className={`
            flex items-center justify-center w-24 h-24 ml-16 -mt-12
            rounded-full bg-[#F5F5F5] border-slate-300 border-dashed border-2
            cursor-pointer hover:border-slate-500 z-50
          `}
          id="dropzone"
          onClick={() => inputRef.current?.click()}
        >
          <input
            type="file"
            onChange={(e:any) => setFile(e.target.file)}
            hidden
            ref={inputRef}
          />
        </div>
      )
};
