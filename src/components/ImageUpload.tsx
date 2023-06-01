"use client"

import { useState, useRef } from "react";

interface ImageUploadProps {
  handleUpload: any;
}

export default function ImageUpload({
  handleUpload,
}: ImageUploadProps) {

  const [file, setFile] = useState(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e:any) => {
    e.preventDefault();
    setFile(e);
    console.log(e)
    // console.log(file)
  };


  const uploadIcon = <svg xmlns="http://www.w3.org/2000/svg" width="76" height="76" fill="none">
    <path fill="#8915E4" d="M40.226 35.404a3.136 3.136 0 0 0-4.39 0l-9.408 9.094a3.136 3.136 0 1 0 4.328 4.516l4.108-3.983v17.687a3.136 3.136 0 1 0 6.271 0v-17.53l4.046 4.077a3.136 3.136 0 0 0 4.453 0 3.135 3.135 0 0 0 0-4.453l-9.408-9.408Z"/>
    <path fill="#8915E4" d="M55.78 21.951a18.816 18.816 0 0 0-35.56 0 15.68 15.68 0 0 0-9.66 25.934 3.136 3.136 0 1 0 4.705-3.983 9.408 9.408 0 0 1 7.055-15.679h.314a3.136 3.136 0 0 0 3.136-2.509 12.544 12.544 0 0 1 24.585 0 3.136 3.136 0 0 0 3.136 2.509h.188a9.408 9.408 0 0 1 7.056 15.68 3.137 3.137 0 0 0 .282 4.452 3.136 3.136 0 0 0 2.07.784 3.137 3.137 0 0 0 2.352-1.066 15.679 15.679 0 0 0-9.659-26.122Z"/>
  </svg>

  return (
    <div
      className={`
        flex box-border items-center justify-center p-16 h-1/6 w-1/6
        rounded-lg bg-[#F5F5F5] border-slate-300 border-dashed border-2
        cursor-pointer hover:border-slate-500
      `}
      id="dropzone"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        type="file"
        onChange={(e:any) => setFile(e.target.file)}
        hidden
        ref={inputRef}
      />
      <label
        className="flex flex-col transition duration-150 justify-center items-center text-purple-450 cursor-pointer"
      >
        {uploadIcon}
        Click or drop file to upload
      </label>

    </div>
  )
};
