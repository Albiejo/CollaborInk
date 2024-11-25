import Header from "@/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import AddDocumentButton from "@/components/AddDocumentButton";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDocuments } from "@/lib/actions/room.actions";
import Link from "next/link";
import { dateConverter } from "@/lib/utils";
import {DeleteModal} from "@/components/DeleteModal";
import Notifications from "@/components/Notifications";

const Home = async () => {
  const clerkUSer = await currentUser();
  if (!clerkUSer) {
    redirect("/sign-in");
  }
  const roomDocuments = await getDocuments(
    clerkUSer?.emailAddresses[0].emailAddress
  );

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
        <Notifications/>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {roomDocuments.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>

            <AddDocumentButton
              userId={clerkUSer?.id}
              email={clerkUSer?.emailAddresses[0].emailAddress}
            />
          </div>

        <ul className="document-ul">
            {roomDocuments.data.map(({id , metadata , createdAt}:any)=>(
                <li className="document-list-item" key={id}>
                    <Link href={`/document/${id}`} className="flex flex-1 items-center gap-4 ">
                    <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                        <Image
                        src='/assets/icons/doc.svg'
                        alt="Doc"
                        height={40}
                        width={40}
                        />
                    </div>

                    <div className="space-y-1">
                        <p className="text-lg line-clamp-1">{metadata.title}</p>
                        <p className="text-sm font-light text-blue-100">Created about {dateConverter(createdAt)}</p>
                    </div>
                    </Link>
                    <DeleteModal roomId={id}/>
                </li>
            ))}
        </ul>

        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/doc.svg"
            alt="document"
            height={40}
            width={40}
            className="mx-auto"
          />
          <AddDocumentButton
            userId={clerkUSer?.id}
            email={clerkUSer?.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
