import React, { useState } from 'react';
import Modal from 'react-modal';
import SearchBar from '@theme-original/SearchBar';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RegularChatbox from './RegularChatbox';

Modal.setAppElement('body');

const AlgoliaSearchModal: React.FC = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<string>('chat');

    const handleSearch = (event: any) => {
        event.preventDefault();
        setModalIsOpen(true);
    };

    return (
        <div>
            <a
                className={`dev-portal-signup dev-portal-link`}
                onClick={handleSearch}
                style={{ padding: '0.5em', cursor: "pointer" }}
                type="submit"
            >
                🔍 🤖
            </a>
            <Modal
                className="centered-modal"
                isOpen={modalIsOpen}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 1000
                    },
                    content: {
                        color: 'white', // White text
                        borderRadius: '8px', // Rounded corners
                        top: "25%",
                        padding: '30px', // Padding around the content
                        position: 'absolute', // Required for custom positioning
                        left: '50%', // Center the modal horizontally
                        transform: 'translate(-50%, -50%)', // Adjust for the modal size
                    },
                }}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <Tabs>
                    <TabItem
                        onClick={() => setSelectedTab('chat')}
                        value="chat"
                        label="Chat"
                        active={selectedTab === 'chat'}
                    >
                        <RegularChatbox messages={[{ sender: 'bot', text: 'Hi welcome to Ngrok Docs, type your question below and I’ll help you find the answer' }]} />
                    </TabItem>
                    <TabItem
                        onClick={() => setSelectedTab('search')}
                        value="search"
                        label="Search"
                        active={selectedTab === 'search'}
                    >
                        <SearchBar style={{ width: "100%" }} onClick={() => setModalIsOpen(false)} />
                    </TabItem>
                </Tabs>
            </Modal>
        </div>
    );
};

export default AlgoliaSearchModal;
