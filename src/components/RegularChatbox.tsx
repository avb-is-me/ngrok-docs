import React, { useState, useRef } from 'react';
import { unified } from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import rehype2react from 'rehype-react';




import logoJson from '../../logo.json'
import chatJson from '../../chat.json'

const { logo } = logoJson
const { chatUrl } = chatJson


console.log(logo)

const processor = unified()
    .use(markdown)
    .use(remark2rehype)
    .use(rehype2react, { createElement: React.createElement });

function ChatBox({ messages, onSendMessage }) {
    const [showChatBox, setShowChatBox] = useState(false);
    const [loadingBar, setLoadingBar] = useState(false)
    const [message, setMessage] = React.useState('');
    const buttonValues = ['How do I get stared with Ngrok', 'What is Cloud Edge?', 'How do I use with Go'];
    const buttonRef = useRef();

    const handleClick = (value) => {
        setMessage(value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
    };

    const handleSendMessage = async (event) => {
        event.preventDefault();
        console.log(message);
        messages.push({ text: message });
        setLoadingBar(true)
        try {
            const response = await fetch(chatUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: "Try to answer the question to the best you can with the context given, if you don't know just respond as friendly as you can.  Now try to answer this question in the context of ngrok: " + message }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response from server');
            }

            const data = await response.json();
            console.log(data);
            const { source_nodes } = data?.response
            const answer = data?.response?.response
            messages.push({ text: `${answer} \n Here is the orignal article:` });
            source_nodes.forEach((messageObject) => {
                messages.push({
                    text: `[Original Source](/${messageObject?.node?.extra_info?.source}) \n ${messageObject?.node?.text}`,
                });
            });
        } catch (error) {
            console.error(error);
            //messages.push({ text: 'hi' });
        }
        setLoadingBar(false)
        setMessage('');
    };

    return (
        <div>
            <div className={`chat-box-two show`}>
                <div style={{ width: "100%" }}>
                    {/* <button style={{float: "right"}} onClick={() => setShowChatBox(!showChatBox)}>X</button> */}
                    <h3>Chat with the Ngrok-Docs 🤖</h3>
                </div>

                <div className='chat-box__messages'>
                    {messages.map((message, index) => (
                        <div
                            className={`chat-box__message ${message.sender === 'user' ? 'user-message' : 'bot-message'
                                }`}
                            key={index}
                        >
                            {processor.processSync(message.text).result}
                        </div>
                    ))}
                    {loadingBar && (
                        <div className={'chat-box__message'}> 🦾🤖 Loading....</div>
                    )}
                </div>

                <form onSubmit={handleSendMessage}>
                    <div style={{ width: "100%" }}>
                        {buttonValues.map((buttonValue, index) => (
                            <a onKeyDown={handleKeyDown} className={`dev-portal-signup dev-portal-link`} key={index} onClick={(e) => handleClick(buttonValue)}>
                                {buttonValue}
                            </a>
                        ))}

                    </div>

                    <input
                        type='text'
                        placeholder='Type your message'
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        className='chat-box__input'
                    />
                    <button type='submit' className='chat-box__button'>
                        Send
                    </button>
                </form>
            </div>
        </div>

    );
}

export default ChatBox;
