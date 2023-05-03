import React from 'react';
import SearchBar from '@theme-original/SearchBar';
import ChatBox from '../../components/Chatbox';
import TabModal from '../../components/OneMoreTime'

export default function SearchBarWrapper(props) {
  return (
    <>
      <div style={{display: "flex", alignItems: "center"}}>
      <ChatBox messages={[{sender: "bot", text: "Hi welcome to Ngrok Docs, type your question below and I’ll help you find the answer"}]} />
      <SearchBar {...props} />
      <TabModal />
      </div>
    </>
  );
}
