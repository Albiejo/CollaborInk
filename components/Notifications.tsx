'use client'


import React, { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useInboxNotifications, useUnreadInboxNotificationsCount } from "@liveblocks/react";
import { InboxNotification, InboxNotificationList, LiveblocksUIConfig } from "@liveblocks/react-ui";

const Notifications = () => {

    const {inboxNotifications} = useInboxNotifications();
    const {count} = useUnreadInboxNotificationsCount();

    const unReadNotifications = inboxNotifications?.filter((notification)=>!notification.readAt) || [];

  return (
    <Popover>
      <PopoverTrigger className="relative flex size-10 items-center justify-center rounded-lg">
        <Image
        src='/assets/icons/bell.svg'
        alt="inbox"
        height={24}
        width={24}
        />
        {count > 0 && <div className="absolute right-2 top-2 z-20 size-2  rounded-full bg-blue-500" />}
      </PopoverTrigger>
      <PopoverContent align="end" className="shad-popover">
        <LiveblocksUIConfig
        overrides={{INBOX_NOTIFICATION_TEXT_MENTION:(user:ReactNode)=>(
            <>{user} mentioned you.</>
        )}}
        >
            <InboxNotificationList>
            
            {unReadNotifications.length <= 0 && (
                <p className="text-center py-2 text-dark-500">No new notifications</p>
            )}

            {unReadNotifications.length > 0 && (
                unReadNotifications?.map((notification)=>(
                    <InboxNotification
                    key={notification.id}
                    inboxNotification={notification}
                    className="bg-dark-200 text-white"
                    href={`/document/${notification.roomId}`}
                    showActions={false}
                    kinds={{
                        thread: (props) => (
                          <InboxNotification.Thread {...props} 
                            showActions={false}
                            showRoomName={false}
                          />
                        ),
                        textMention: (props) => (
                          <InboxNotification.TextMention {...props} 
                            showRoomName={false}
                          />
                        ),
                        $documentAccess: (props) => (
                          <InboxNotification.Custom {...props} title={props.inboxNotification.activities[0].data.title} aside={<InboxNotification.Icon className="bg-transparent">
                            <Image 
                              src={props.inboxNotification.activities[0].data.avatar as string || ''}
                              width={36}
                              height={36}
                              alt="avatar"
                              className="rounded-full"
                            />
                          </InboxNotification.Icon>}>
                            {props.children}
                          </InboxNotification.Custom>
                        )
                      }}
                    />
                ))
            )}

            </InboxNotificationList>

        </LiveblocksUIConfig>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
