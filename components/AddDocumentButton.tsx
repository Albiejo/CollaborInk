'use client';

import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createDocument } from '@/lib/actions/room.actions'


const AddDocumentButton = ({userId , email} : AddDocumentBtnProps) => {

    const router = useRouter();

    const handleSumit = async()=>{
      try {
        const room = await createDocument({userId ,email});
        if(room){       
          router.push(`document/${room.id}`)
        }
      } catch (error) {
        console.log("error occurred :",error);
        
      }
    }


  return (
   <Button  type='submit' onClick={handleSumit} className='gradient-blue flex gap-1 shadow-md'>
    <Image
    src='/assets/icons/add.svg'
    alt='add'
    height={24}
    width={24}
    />
    <p className='hidden sm:block'>Start a blank document</p>
   </Button>
  )
}

export default AddDocumentButton