
import React, { useState, useEffect } from 'react';
import { toastVariants, toastActionVariants, toastDescriptionVariants, toastTitleVariants } from '@/components/ui/toast';
import ReactTimeAgo from 'react-time-ago'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const SingleNotification = ({ id, excerpt, createdAt, status, type, context, floating, actionComponent: ActionComponent }) => {
  const [show, setShow] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const floatingProps = floating ? {
    onClose: () => setShow(false),
    delay: 7000,
    autohide: true,
  } : {}

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? (
    <div className={cn(toastVariants({ variant: status === 'new' ? 'primary' : 'default' }))}>
      <div className="grid gap-1">
        <div className={cn(toastTitleVariants())}>
          {context.from}
        </div>
        <div className={cn(toastDescriptionVariants())}>
          {type === 'message' && "Nouveau message"}: {excerpt}
          <ReactTimeAgo date={new Date(createdAt)} locale="fr" />
        </div>
      </div>
      {!!ActionComponent &&
        <ActionComponent asChild>
        <Link
          className={cn(toastActionVariants())}
          href={type === 'message' && `/messages/${context.conversationId}`}>
          👀
          </Link>
        </ActionComponent>

      }
      {!ActionComponent &&
        <Link
          className={cn(toastActionVariants())}
          href={type === 'message' && `/messages/${context.conversationId}`}>
        👀
        </Link>
      }
    </div>
  ) : null;
}


export default SingleNotification;
