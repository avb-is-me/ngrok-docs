import React from 'react';
import SearchBar from '@theme-original/SearchBar';
import ChatBox from '../../components/Chatbox';

export default function SearchBarWrapper(props) {
  return (
    <>
      <ChatBox messages={[]} />
      <SearchBar {...props} />
    </>
  );
}
