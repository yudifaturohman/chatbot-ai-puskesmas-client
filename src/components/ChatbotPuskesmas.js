import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';

const ChatbotPuskesmas = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const fetchMessages = async (currentSessionId) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/messages/${currentSessionId}`);
      const data = await res.json();

      const formattedMessages = data
        .sort((a, b) => a.id - b.id)
        .map((item, idx) => ({
          id: item.id || idx,
          sender: item.message.type === 'human' ? 'user' : 'bot',
          text: item.message.data.content,
        }));

      setMessages(formattedMessages);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const newSessionId = sessionId || uuidv4();
    if (!sessionId) setSessionId(newSessionId);

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: message,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: message,
          session_id: newSessionId,
        }),
      });

      if (!res.ok) throw new Error('Gagal mengirim pesan');

      await new Promise((resolve) => setTimeout(resolve, 1000));
      await fetchMessages(newSessionId);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'bot',
          text: 'Maaf, terjadi kesalahan.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-gray-900 h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white font-bold">CH</span>
          </div>
          <div>
            <h3 className="text-white font-medium">Chatbot Puskesmas</h3>
          </div>
        </div>
      </header>

      {/* Chat Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end space-x-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}
          >
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0">
                <img
                    src={process.env.PUBLIC_URL + '/logo-ai.webp'}
                    alt="AI Logo"
                    className="w-full h-full object-cover rounded-full"
                />
              </div>
            )}
            <div
              className={`max-w-xs ${
                msg.sender === 'user' ? 'bg-purple-600' : 'bg-gray-700'
              } rounded-lg p-3 text-white`}
            >
              <div className="markdown-body">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
             </div>
              <span
                className={`text-xs mt-1 block ${
                  msg.sender === 'user' ? 'text-purple-300 text-right' : 'text-gray-400'
                }`}
              >
              </span>
            </div>
          </div>
        ))}

        {/* Typing */}
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

      {/* Input */}
      <div className="bg-gray-800 border-t border-gray-700 p-3">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-700 rounded-full px-4 py-2 flex items-center">
            <input
              type="text"
              placeholder="Ketik pesan..."
              className="bg-transparent text-white w-full focus:outline-none placeholder-gray-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotPuskesmas;
