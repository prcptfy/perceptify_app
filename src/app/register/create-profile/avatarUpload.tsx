'use client'

import React, { useState, useRef } from 'react';
import { useSupabase } from '@/components/supabase-provider';
import Image from 'next/image';

// drag drop file component
export default function AvatarUpload({
  handleFileDrop,
  handleFileClick
}: {
  handleFileDrop: Function,
  handleFileClick: Function,
}) {
  // drag state
  const [dragActive, setDragActive] = useState<boolean>(false);
  // ref
  const inputRef = useRef<HTMLInputElement>(null);
  const { supabase, session } = useSupabase();

  const avatarIcon =
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="65" fill="none">
      <path fill="#8915E4" d="M20.367 35.503a11.456 11.456 0 1 0 0-22.912 11.456 11.456 0 0 0 0 22.912ZM37.55 64.142a2.864 2.864 0 0 0 2.864-2.863 20.047 20.047 0 1 0-40.095 0 2.864 2.864 0 0 0 2.864 2.863H37.55Z"/>
      <path fill="#8915E4" fill-rule="evenodd" d="M51 7h-6V1a1 1 0 1 0-2 0v6h-6a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0V9h6a1 1 0 1 0 0-2Z" clip-rule="evenodd"/>
    </svg>

  async function uploadFile(e: React.DragEvent<HTMLInputElement>) {
    const avatarFile = e.dataTransfer.files[0];
    console.log(avatarFile)
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`${session?.user.id}/${avatarFile.name}`, avatarFile);

    if (error) console.log("ERROR!", error);
    else console.log(data)
  }

  // handle drag events
  const handleDrag = function(e:any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function(e:any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files);
      handleFileDrop(e);
    }
  };

  // triggers when file is selected with click
  const handleChange = function(e:any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);
      handleFileClick(e);
    }
  };

// triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef?.current?.click();
  };

  return (
    <form className="h-48 w-48 text-center relative max-w-full mb-4" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input ref={inputRef} type="file" className='hidden' multiple={true} onChange={handleChange} />
      <label id="label-file-upload" htmlFor="input-file-upload"
        className={`
          group h-full hover:cursor-pointer hover:border-purple-450 transition
          flex items-center justify-center
          border-dashed rounded-full border-[#cbd5e1] border-3 bg-[#F8FAFC] active:bg-white
        `} onClick={onButtonClick}>
        <div className='flex flex-col items-center gap-2'>
          <div className='group-hover:scale-105 transition'>
            {avatarIcon}
          </div>
          <p className='text-purple-450'>Upload Profile Picture</p>
          <p className='text-purple-450'>(optional)</p>
          {/* <button className="cursor-pointer text-[1rem] bg-transparent hover:underline font-bold rounded" onClick={onButtonClick}>Upload a file</button> */}
        </div>
      </label>
      { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
        className={`
          w-full h-full cursor-pointer rounded-full top-0 right-0 bottom-0 left-0 absolute
        `}
      ></div> }
    </form>
  );
};
