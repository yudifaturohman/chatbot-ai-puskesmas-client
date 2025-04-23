import React, { useState } from 'react';

const ChatbotPuskesmas = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hey there! How are you doing today?',
      time: '10:22 AM',
    },
    {
      id: 2,
      sender: 'user',
      text: "Hi! I'm doing great, thanks for asking. How about you?",
      time: '10:23 AM',
    },
    {
      id: 3,
      sender: 'bot',
      text: 'Check out this cool design I found:',
      time: '10:25 AM',
      image: '/api/placeholder/400/200',
    },
    {
      id: 4,
      sender: 'user',
      text: 'That looks amazing! I love the color palette they used.',
      time: '10:26 AM',
    },
  ]);
  const [isTyping, setIsTyping] = useState(true);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (message.trim() === '') return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate bot typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = {
        id: messages.length + 2,
        sender: 'bot',
        text: 'Thanks for your message! How can I help you today?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 2000);
  };

  return (
    <div className="bg-gray-900 h-screen flex flex-col">
      {/* Chat Header */}
      <header className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white font-bold">CH</span>
          </div>
          <div>
            <h3 className="text-white font-medium">Chatbot Puskesmas</h3>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-white rounded-full p-2 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-white rounded-full p-2 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-hide space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end space-x-2 ${
              msg.sender === 'user' ? 'justify-end' : ''
            }`}
          >
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
            )}
            <div
              className={`max-w-xs ${
                msg.sender === 'user'
                  ? 'bg-purple-600'
                  : 'bg-gray-700'
              } rounded-lg p-3 text-white`}
            >
              <p className={`text-sm ${msg.image ? 'mb-2' : ''}`}>{msg.text}</p>
              {msg.image && (
                <img
                  src={msg.image}
                  alt="shared content"
                  className="rounded-md w-full h-auto"
                />
              )}
              <span
                className={`text-xs ${
                  msg.sender === 'user' ? 'text-purple-300 text-right' : 'text-gray-400'
                } mt-1 block ${msg.sender === 'user' ? 'text-right' : ''}`}
              >
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-end space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
            <div className="bg-gray-700 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input Area */}
      <div className="bg-gray-800 border-t border-gray-700 p-3">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-700 rounded-full px-4 py-2 flex items-center">
            <input
              type="text"
              placeholder="Type a message"
              className="bg-transparent text-white w-full focus:outline-none placeholder-gray-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotPuskesmas;