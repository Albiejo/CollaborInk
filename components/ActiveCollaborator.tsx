import { useOthers } from '@liveblocks/react/suspense'
import Image from 'next/image';
import React from 'react'

const ActiveCollaborator = () => {

    const others = useOthers();
    const collaborators = others.map((other)=>other.info);


  return (
  <ul>
    {collaborators.map(({id, avatar , name , color})=>(
        <li key={id}>
            <Image
            src={avatar}
            height={100}
            width={100}
            alt={name}
            className='rounded-full ring-2 size-8 inline-block ring-dark-100'
            style={{border:`3px solid ${color}`}}
            />
        </li>
    ))}
  </ul>
  )
}

export default ActiveCollaborator