'use client';

import { RoomProvider, ClientSideSuspense } from "@liveblocks/react";
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import ActiveCollaborator from "./ActiveCollaborator";

const CollabrativeRoom = ({roomId , roomMetadata} : CollaborativeRoomProps) => {
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className="collaborative-room">
          <Header>
            <div className="flex w-fit items-center justify-center gap-2 ">
              <p className="document-title">Document</p>
            </div>
            <div className="flex w-full flex-1 gap-2 sm:gap-3 justify-end">
              <ActiveCollaborator/>
            
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

export default CollabrativeRoom;
