'use server'


import {nanoid} from 'nanoid';
import { revalidatePath } from 'next/cache';
import { parseStringify } from '../utils';
import {liveblocks} from '../liveblocks'


export const createDocument = async({userId , email} : CreateDocumentParams)=>{

    const roomId = nanoid();
    
    try {
        const metadata={
            creatorId:userId,
            email,
            title:"untitled"
        }

        const usersAccesses :RoomAccesses = {
            [email] : ['room:write']
        }

        const room = await liveblocks.createRoom(roomId, {
           metadata,
           usersAccesses,
           defaultAccesses :['room:write']
          });


          revalidatePath('/')

          return parseStringify(room)


    } catch (error) {
        console.log(`some error happened while creating room ${error}`);
        
    }
}


export const getDocument = async({roomId , userId} :{roomId :string  , userId:string})=>{
    try {
        const room = await liveblocks.getRoom(roomId);
        // const hasAccess = Object.keys(room.usersAccesses).includes(userId)
        // if(!hasAccess){
        //     throw new Error('you dont have access to this room');
        // }
        return parseStringify(room);
    } catch (error) {
        console.log(`error occurred while getting into a room :${error}`);
        
    }
}


export const getDocuments = async(email:string)=>{
    try {
        const rooms = await liveblocks.getRooms({userId:email});
        // const hasAccess = Object.keys(room.usersAccesses).includes(userId)
        // if(!hasAccess){
        //     throw new Error('you dont have access to this room');
        // }
        return parseStringify(rooms);
    } catch (error) {
        console.log(`error occurred while getting into a rooms :${error}`);
        
    }
}

export const updateDocument = async(roomId:string , title :string)=>{
    try {
        const updatedRoom = await liveblocks.updateRoom(roomId, {
            metadata:{
                title
            }
        })
        revalidatePath(`/documents/${roomId}`)
        return parseStringify(updatedRoom);
    } catch (error) {
        console.log("some error occurrred :" , error);
        
    }
}