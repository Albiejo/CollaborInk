import React from "react";
import CollabrativeRoom from "@/components/CollabrativeRoom";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { get } from "http";
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";



const Document = async ({params : {id}} : SearchParamProps) => {
  
  const clerkUser = await currentUser();
  if(!clerkUser) redirect('/sign-in');

  const room = await getDocument({
    roomId:id,
    userId:clerkUser.emailAddresses[0].emailAddress
  })
  if(!room) redirect('/')

    const userIds = Object.keys(room.usersAccesses);
    const users = await getClerkUsers({userIds})

    const userData = users.map((user:User)=>({
      ...user,
      userType:room.usersAccesses[user.email]?.includes('room:write') ? 'editor' : 'viewer'
    }))

    const currentUserType =room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') ? 'editor' : 'viewer';
   
  return (
   <main className="flex w-full items-center flex-col">
    <CollabrativeRoom 
    roomId={room.id}
    roomMetadata={room.metadata}
    users={userData}
    currentUserType={currentUserType}
    />
   </main>
  );
};

export default Document;
