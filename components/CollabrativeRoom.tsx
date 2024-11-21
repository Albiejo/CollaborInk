"use client";

import { RoomProvider, ClientSideSuspense, RoomContext } from "@liveblocks/react";
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import ActiveCollaborator from "./ActiveCollaborator";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { updateDocument } from "@/lib/actions/room.actions";
import Loader from "./Loader";





const CollabrativeRoom = ({ roomId, roomMetadata }: CollaborativeRoomProps) => {


    const currentUserType = 'editor';


    const [documentTitle, setDocumentTitle] = useState(roomMetadata.title)
    const [editing, setEditing] = useState(false)
    const [Loading, setLoading] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLDivElement>(null)

    const updateTitleHandler = async(e:React.KeyboardEvent<HTMLInputElement>) =>{
      if(e.key==='Enter'){
        setLoading(true)
      
      try {
        if(documentTitle !== roomMetadata.title){
          const updatedDocument = await updateDocument(roomId , documentTitle);
          if(updatedDocument){
            setEditing(false)
          }
        }
      } catch (error) {
        console.error("some error occurred",error);
        
      }

      setLoading(false)
    }
  }
    useEffect(() => {
     const handleClickOutisde=(e:MouseEvent)=>{
      if(containerRef.current && !containerRef.current.contains(e.target as Node)){
        setEditing(false)
        updateDocument(roomId , documentTitle)
      }
     }
     document.addEventListener('mousedown' , handleClickOutisde)
     return () => {
      document.removeEventListener('mousedown',handleClickOutisde)
    }
    }, [roomId , documentTitle])
    

    useEffect(()=>{
      if(editing && inputRef.current){
        inputRef.current.focus();
      }
    },[editing])


  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader/>}>
        <div className="collaborative-room">
          <Header>
            <div ref={containerRef} className="flex w-fit items-center justify-center gap-2 ">
            
             {editing && !Loading ? (<Input
             type="text"
             value={documentTitle}
             ref={inputRef}
             placeholder="Enter title.."
             onChange={(e)=>setDocumentTitle(e.target.value)}
            onKeyDown={updateTitleHandler}
            disabled={!editing}
            className="document-title-input"
             />) : 
             (<>
             <p className="document-title">{documentTitle}</p>
             </>)}

              {currentUserType === 'editor' && !editing && (
                <Image 
                src='/assets/icons/edit.svg'
                alt="edit"
                height={24}
                width={24}
                onClick={() => setEditing(true)}
                className="pointer"
                />
              )}


              {currentUserType !== 'editor' && !editing && (
                <p className="view-only-tag">View only</p>
              )}

              {Loading && <p className="text-sm text-gray-400">Saving...</p>}
            </div>
            <div className="flex w-full flex-1 gap-2 sm:gap-3 justify-end">
              <ActiveCollaborator />

              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>

          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollabrativeRoom 
