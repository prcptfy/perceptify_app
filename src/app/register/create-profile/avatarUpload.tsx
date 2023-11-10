'use client'

import React, { useState, useRef } from 'react';
import { useSupabase } from '@/components/supabase-provider';

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
          h-[100%]
          flex items-center justify-center
          border-dashed rounded-full border-[#cbd5e1] border-2 bg-[#F8FAFC] active:bg-white
        `}>
        <div>
          <p>Drop your file here or</p>
          <button className="cursor-pointer p-[.25rem] text-[1rem] bg-transparent hover:underline font-bold rounded" onClick={onButtonClick}>Upload a file</button>
        </div>
      </label>
      { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
        className={`
          w-full h-full rounded-full top-0 right-0 bottom-0 left-0 absolute
        `}
      ></div> }
    </form>
  );
};
