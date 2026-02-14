'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState, FormEvent } from 'react';

export default function RozicChat() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === 'streaming') return;
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <header className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
        <h1 className="text-xl font-bold text-blue-400">RO-ZIC: The Agent</h1>
        <span className="text-xs text-gray-400">System Status: Online 🟢</span>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <p>CTO님, 오셨습니까?</p>
            <p className="text-sm">명령을 기다리고 있습니다.</p>
          </div>
        )}

        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl shadow-lg ${
              m.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-gray-700 text-gray-100 rounded-bl-none border border-gray-600'
            }`}>
              <div className="text-xs font-bold mb-1 opacity-70">
                {m.role === 'user' ? '이유림 CTO' : 'RO-ZIC'}
              </div>
              <div className="whitespace-pre-wrap leading-relaxed">
                {m.parts?.filter(p => p.type === 'text').map(p => p.text).join('') ?? ''}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-gray-800 border-t border-gray-700 flex gap-2">
        <input
          className="flex-1 p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:border-blue-500 transition-colors"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="로직아, 오늘 기분 어때?"
        />
        <button
          type="submit"
          disabled={status === 'streaming'}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-bold transition-colors"
        >
          전송
        </button>
      </form>
    </div>
  );
}
