'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import AIChat to ensure it only loads on client
const AIChat = dynamic(() => import('./AIChat').then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => null
});

const FloatingChatButton = dynamic(() => import('./AIChat').then(mod => ({ default: mod.FloatingChatButton })), {
  ssr: false,
  loading: () => null
});

export default function ChatWrapper() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  const openChat = () => {
    setIsChatOpen(true);
    setIsChatMinimized(false);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setIsChatMinimized(false);
  };

  const minimizeChat = () => {
    setIsChatMinimized(!isChatMinimized);
  };

  return (
    <>
      {!isChatOpen && (
        <FloatingChatButton onClickAction={openChat} />
      )}
      
      <AIChat
        isOpen={isChatOpen}
        onCloseAction={closeChat}
        isMinimized={isChatMinimized}
        onMinimizeAction={minimizeChat}
      />
    </>
  );
}
