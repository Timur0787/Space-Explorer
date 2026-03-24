import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ai-chat.css';

export default function AIChat(): React.JSX.Element {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = { text: message, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    const question = message;
    setMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/ai/questions', { question });
      const aiResponse = { 
        text: response.data.answer || 'Не удалось получить ответ от ИИ', 
        isUser: false 
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error: any) {
      console.error('AI Chat Error:', error);
      let errorMessage = 'Извините, произошла ошибка при обращении к ИИ. Попробуйте еще раз.';
      
      if (error.response) {
        // Сервер ответил с кодом ошибки
        errorMessage = error.response.data?.error || error.response.data?.message || errorMessage;
      } else if (error.request) {
        // Запрос был отправлен, но ответа не получено
        errorMessage = 'Не удалось подключиться к серверу. Проверьте, что сервер запущен.';
      }
      
      const errorResponse = { 
        text: errorMessage, 
        isUser: false 
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-chat-container">
      <div className="ai-chat-header">
        <div className="ai-chat-title">
          <svg 
            className="sparkles-icon" 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            <path d="M5 3v4"/>
            <path d="M19 17v4"/>
            <path d="M3 5h4"/>
            <path d="M17 19h4"/>
          </svg>
          <h2>Спросите ИИ о планетах</h2>
        </div>
      </div>

      <div className="ai-chat-messages">
        {messages.length === 0 && (
          <div className="ai-chat-empty">
            <p>Задайте вопрос о планетах Солнечной системы</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`ai-message ${msg.isUser ? 'user-message' : 'ai-response'}`}>
            <div className="message-content">
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="ai-message ai-response">
            <div className="message-content loading">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="ai-chat-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Например: Расскажи о Марсе..."
          className="ai-chat-input"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="ai-chat-submit"
          disabled={isLoading || !message.trim()}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m22 2-7 20-4-9-9-4Z"/>
            <path d="M22 2 11 13"/>
          </svg>
        </button>
      </form>
    </div>
  );
}

