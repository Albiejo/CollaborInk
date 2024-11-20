import Header from '@/components/Header'
import { SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'
import Image from 'next/image'
import AddDocumentButton from '@/components/AddDocumentButton'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'


const Home = async() => {

    const document = [];
    const clerkUSer = await currentUser();
    if(!clerkUSer){
        redirect('/sign-in')
    }
  return (
    <main className='home-container'>
        <Header className='sticky left-0 top-0'>
            <div className='flex items-center gap-2 lg:gap-4'>
            notification 
            <SignedIn>
                <UserButton/>
            </SignedIn>
            </div>
        </Header>

        {
            document.length > 0 ? (
                <div>

                </div>
            ) : (
                <div className='document-list-empty'>
                     <Image
                     src='/assets/icons/doc.svg'
                     alt='document'
                     height={40}
                     width={40}
                     className='mx-auto'
                     />
                <AddDocumentButton
                userId = {clerkUSer?.id}
                email = {clerkUSer?.emailAddresses[0].emailAddress}
                />
                </div>
            )
        }

    </main>
  )
}

export default Home