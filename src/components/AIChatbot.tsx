'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useAppTranslation } from '@/hooks/useAppTranslation';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function AIChatbot() {
  const { t, i18n } = useAppTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: '1',
      text: t(
        'chatbot.initialGreeting',
        "Hello! I'm your CES AI assistant. Feel free to ask me anything—projects, technology, or general questions.",
      ),
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [modelUsed, setModelUsed] = useState<string | null>(null);
  const [responseSource, setResponseSource] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async (overrideText?: string) => {
    const messageText = overrideText ?? inputValue;
    if (typeof messageText !== 'string' || !messageText.trim()) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setChatError(null);
    setSuggestions([]);
    setInsights([]);
    setResponseSource(null);

    const updatedMessages = [...messages, userMessage];

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(message => ({
            role: message.sender === 'user' ? 'user' : 'assistant',
            content: message.text,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Chat API error');
      }

      setInsights(Array.isArray(data?.insights) ? data.insights : []);
      setSuggestions(Array.isArray(data?.suggestions) ? data.suggestions : []);
      setModelUsed(typeof data?.model === 'string' ? data.model : null);
      setResponseSource(data?.cached ? 'cache' : data?.source ?? null);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text:
          data?.reply ||
          t('chatbot.fallbackBusy', 'Our AI assistant is currently busy. Please try again shortly.'),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat assistant failed:', error);
      setChatError(t('chatbot.errorBanner', 'AI assistant is unavailable. Displaying cached knowledge.'));
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: t(
            'chatbot.errorMessage',
            'I encountered a temporary issue reaching our AI services. Please review the dashboards or ask again in a moment.',
          ),
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
      setSuggestions([]);
      setInsights([]);
      setModelUsed(null);
      setResponseSource('fallback');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    void handleSendMessage(suggestion);
  };

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    setMessages(prev =>
      prev.map((message, index) =>
        index === 0 && message.sender === 'bot'
          ? {
              ...message,
              text: t(
                'chatbot.initialGreeting',
                "Hello! I'm your CES AI assistant. Feel free to ask me anything—projects, technology, or general questions.",
              ),
            }
          : message,
      ),
    );
  }, [i18n.language, t]);

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg hover:shadow-xl transition-transform z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={
          isOpen ? t('chatbot.actions.close', 'Close chat assistant') : t('chatbot.actions.open', 'Open chat assistant')
        }
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-t-lg">
              <h3 className="font-bold">
                {t('chatbot.header.title', 'CES Ltd. AI Assistant')}
              </h3>
              <p className="text-sm opacity-90">
                {t('chatbot.header.subtitle', 'Energy & Construction Expert')}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />

              {chatError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                  {chatError}
                </div>
              )}

              {insights.length > 0 && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-900 shadow-sm">
                  <p className="font-semibold uppercase tracking-[0.24em] text-blue-700">
                    {t('chatbot.insights.title', 'Key insights')}
                  </p>
                  <ul className="mt-2 space-y-1 text-blue-900">
                    {insights.map((item, index) => (
                      <li key={`${item}-${index}`} className="flex gap-2">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.3em] text-blue-500">
                    {modelUsed && (
                      <span>
                        {t('chatbot.insights.model', 'Model')}: {modelUsed}
                      </span>
                    )}
                    {responseSource && (
                      <span>
                        {t('chatbot.insights.source', 'Source')}: {responseSource}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={`${suggestion}-${index}`}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('chatbot.inputPlaceholder', 'Ask me anything...')}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('chatbot.send', 'Send')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
