import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface TenantChatWidgetProps {
  tenantId: number;
  tenantName: string;
  primaryColor: string;
}

export default function TenantChatWidget({ tenantId, tenantName, primaryColor }: TenantChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `¡Hola! 👋 Bienvenido a ${tenantName}. ¿En qué puedo ayudarte hoy?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Save message to backend
    try {
      await fetch('/api/public/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId,
          message: userMessage.text,
          sender: 'user'
        })
      });
    } catch (error) {
      console.error('Error saving chat message:', error);
    }

    // Simulate AI delay and response
    setTimeout(async () => {
      const botResponse = getMockResponse(userMessage.text);
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);

      // Save bot response to backend
      try {
        await fetch('/api/public/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tenantId,
            message: botResponse,
            sender: 'bot'
          })
        });
      } catch (error) {
        console.error('Error saving bot message:', error);
      }

    }, 1500);
  };

  const getMockResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('precio') || lowerInput.includes('costo')) {
      return "Para información detallada sobre precios, por favor contáctanos directamente o revisa nuestra sección de servicios.";
    }
    if (lowerInput.includes('horario') || lowerInput.includes('abierto')) {
      return "Nuestro horario de atención es de Lunes a Viernes de 9:00 AM a 6:00 PM.";
    }
    if (lowerInput.includes('ubicacion') || lowerInput.includes('donde')) {
      return "Estamos ubicados en la dirección que aparece en la sección de contacto de esta página.";
    }
    if (lowerInput.includes('servicios')) {
      return `En ${tenantName} ofrecemos una variedad de servicios profesionales. ¿Te gustaría saber más sobre alguno en específico?`;
    }
    
    return "Gracias por tu mensaje. Un miembro de nuestro equipo te responderá lo antes posible. ¿Hay algo más en lo que pueda ayudarte mientras tanto?";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-80 sm:w-96 mb-4 overflow-hidden flex flex-col max-h-[600px]"
          >
            {/* Header */}
            <div className="p-4 flex justify-between items-center text-white" style={{ backgroundColor: primaryColor }}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{tenantName} AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-xs text-white/80">En línea ahora</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 min-h-[300px] max-h-[400px]">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.sender === 'user' 
                          ? 'text-white rounded-tr-none' 
                          : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm'
                      }`}
                      style={msg.sender === 'user' ? { backgroundColor: primaryColor } : {}}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Send size={18} />
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[10px] text-slate-400">Powered by ONEIA</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors"
        style={{ backgroundColor: primaryColor, boxShadow: `0 10px 15px -3px ${primaryColor}40` }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
}
