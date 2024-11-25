"use client";

import React from "react";
import { useSelf } from "@liveblocks/react/suspense";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import USerTypeSelector from "./USerTypeSelector";
import Collaborator from "./Collaborator";
import { updateDocumentAccess } from "@/lib/actions/room.actions";

const ShareModal = ({
  roomId,
  currentUserType,
  creatorId,
  collaborators,
}: ShareDocumentDialogProps) => {
  const user = useSelf();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [userType, setUserType] = React.useState("viewer");

  const shareDocumentHandler=async()=>{
    setLoading(true)

    await updateDocumentAccess({
        roomId,
        email,
        userType:userType as UserType,
        updatedBy:user.info
    })
    setLoading(false)
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="gradient-blue flex h-9 px-4 gap-1" disabled={currentUserType !== 'editor'}>
            <Image
            src='/assets/icons/share.svg'
            alt='share'
            width={20}
            height={20}
            className="min-w-4 md:size-5"
            />
            <p className="mr-1 hidden sm:block">Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle>Manage who can view this project</DialogTitle>
          <DialogDescription>
         Select which users can view and edit this document
          </DialogDescription>
        </DialogHeader>

        <Label htmlFor="Email" className="mt-6 text-blue-100">
            Email address
        </Label>
        <div className="flex items-center gap-3">
            <div className="flex flex-1 rounded-md bg-dark-400">
                <Input
                id="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="share-input"
                />
                <USerTypeSelector
                userType={userType}
                setUserType={setUserType}
                />
            </div>
            <Button type="submit" onClick={shareDocumentHandler} className="flex gap-1 gradient-blue h-full px-5" disabled={loading}>
                {loading ? "Sending..." : "Invite"}
            </Button>
        </div>


        <div className="my-2 space-y-2">
            <ul className="flex flex-col">
                {collaborators.map((collaborator)=>(
                    <Collaborator
                    key={collaborator.id}
                    roomId={roomId}
                    creatorId={creatorId}
                    email={collaborator.email}
                    collaborator={collaborator}
                    user={user.info}
                    />
                ))}
            </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;