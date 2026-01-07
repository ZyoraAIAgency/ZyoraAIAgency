import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import zyoraLogo from "@/assets/zyora-chatbot-logo.png";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface BookingForm {
  name: string;
  email: string;
  company: string;
  message: string;
}

type BookingStep = "name" | "email" | "company" | "message" | "confirm" | "complete";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/zyora-chat`;

export const AIChatbot = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to Zyora AI Agency. I'm here to help you explore how we build scalable AI systems for modern brands. What brings you here today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isBookingMode, setIsBookingMode] = useState(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>("name");
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const parseAIResponse = (text: string): { cleanText: string; navigate?: string; action?: string } => {
    let cleanText = text;
    let navigateRoute: string | undefined;
    let action: string | undefined;

    // Parse navigation intent
    const navMatch = text.match(/\{"navigate":\s*"([^"]+)"\}/);
    if (navMatch) {
      navigateRoute = navMatch[1];
      cleanText = cleanText.replace(navMatch[0], "").trim();
    }

    // Parse action intent
    const actionMatch = text.match(/\{"action":\s*"([^"]+)"\}/);
    if (actionMatch) {
      action = actionMatch[1];
      cleanText = cleanText.replace(actionMatch[0], "").trim();
    }

    return { cleanText, navigate: navigateRoute, action };
  };

  const streamChat = useCallback(async (userMessage: string) => {
    const newHistory: ChatMessage[] = [
      ...conversationHistory,
      { role: "user", content: userMessage }
    ];

    setIsTyping(true);
    let assistantResponse = "";

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newHistory }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast({
            variant: "destructive",
            title: "Rate Limited",
            description: "Too many requests. Please wait a moment and try again.",
          });
          throw new Error("Rate limited");
        }
        if (response.status === 402) {
          toast({
            variant: "destructive",
            title: "Service Unavailable",
            description: "AI service temporarily unavailable.",
          });
          throw new Error("Payment required");
        }
        throw new Error("Failed to start stream");
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      // Add initial assistant message
      const assistantMessageId = Date.now() + 1;
      setMessages(prev => [...prev, {
        id: assistantMessageId,
        text: "",
        isBot: true,
        timestamp: new Date(),
      }]);
      setIsTyping(false);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantResponse += content;
              setMessages(prev => 
                prev.map(m => 
                  m.id === assistantMessageId 
                    ? { ...m, text: assistantResponse } 
                    : m
                )
              );
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Parse the final response for navigation/actions
      const { cleanText, navigate: navRoute, action } = parseAIResponse(assistantResponse);
      
      // Update message with clean text
      setMessages(prev => 
        prev.map(m => 
          m.id === assistantMessageId 
            ? { ...m, text: cleanText } 
            : m
        )
      );

      // Handle navigation
      if (navRoute) {
        setTimeout(() => {
          navigate(navRoute);
        }, 1500);
      }

      // Handle booking action
      if (action === "start_booking") {
        setTimeout(() => {
          setIsBookingMode(true);
          setBookingStep("name");
          setMessages(prev => [...prev, {
            id: Date.now(),
            text: "Let's schedule your consultation. First, what's your **full name**?",
            isBot: true,
            timestamp: new Date(),
          }]);
        }, 1000);
      }

      // Update conversation history
      setConversationHistory([
        ...newHistory,
        { role: "assistant", content: cleanText }
      ]);

    } catch (error) {
      console.error("Stream error:", error);
      setIsTyping(false);
      if (!assistantResponse) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: "I apologize, but I'm having trouble connecting right now. Please try again or contact us directly at ZyoraAIAgency@outlook.com",
          isBot: true,
          timestamp: new Date(),
        }]);
      }
    }
  }, [conversationHistory, navigate, toast]);

  const handleBookingStep = async (userInput: string) => {
    const userMessage: Message = {
      id: Date.now(),
      text: userInput,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const addBotMessage = (text: string, delay = 800) => {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text,
            isBot: true,
            timestamp: new Date(),
          },
        ]);
      }, delay);
    };

    switch (bookingStep) {
      case "name":
        setBookingForm((prev) => ({ ...prev, name: userInput }));
        setBookingStep("email");
        addBotMessage(`Thank you, ${userInput}. What's your **email address**?`);
        break;

      case "email":
        if (!userInput.includes("@") || !userInput.includes(".")) {
          addBotMessage("That doesn't appear to be a valid email. Please try again.");
          return;
        }
        setBookingForm((prev) => ({ ...prev, email: userInput }));
        setBookingStep("company");
        addBotMessage("What's your **company name**? (Type 'skip' if not applicable)");
        break;

      case "company":
        const companyName = userInput.toLowerCase() === "skip" ? "" : userInput;
        setBookingForm((prev) => ({ ...prev, company: companyName }));
        setBookingStep("message");
        addBotMessage("What would you like to **discuss** on the call? Share your main challenge or goal.");
        break;

      case "message":
        setBookingForm((prev) => ({ ...prev, message: userInput }));
        setBookingStep("confirm");
        
        const currentForm = { ...bookingForm, message: userInput };
        addBotMessage(
          `Here's a summary:\n\n**Name:** ${currentForm.name}\n**Email:** ${currentForm.email}\n**Company:** ${currentForm.company || "Not provided"}\n**Message:** ${currentForm.message}\n\nShould I submit this? (Yes/No)`
        );
        break;

      case "confirm":
        if (userInput.toLowerCase().includes("yes")) {
          setIsSubmitting(true);
          
          try {
            const { error } = await supabase.functions.invoke("send-contact-email", {
              body: {
                ...bookingForm,
                message: bookingForm.message,
                source: "chatbot",
              },
            });

            if (error) throw error;

            setMessages((prev) => [
              ...prev,
              {
                id: Date.now(),
                text: "**Submitted successfully.** Our team will reach out within 24 hours. Is there anything else I can help you with?",
                isBot: true,
                timestamp: new Date(),
              },
            ]);

            toast({
              title: "Request Submitted",
              description: "We'll contact you within 24 hours.",
            });

            setIsBookingMode(false);
            setBookingStep("name");
            setBookingForm({ name: "", email: "", company: "", message: "" });
          } catch (error) {
            console.error("Error submitting form:", error);
            addBotMessage("There was an error. Please try again or email us directly at ZyoraAIAgency@outlook.com");
          } finally {
            setIsSubmitting(false);
          }
        } else {
          setIsBookingMode(false);
          setBookingStep("name");
          setBookingForm({ name: "", email: "", company: "", message: "" });
          addBotMessage("No problem. Is there anything else I can help you with?");
        }
        break;
    }
  };

  const handleSend = () => {
    if (!input.trim() || isSubmitting || isTyping) return;

    if (isBookingMode) {
      handleBookingStep(input);
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    streamChat(currentInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: "Our Services", action: "What services does Zyora offer?" },
    { label: "Book a Call", action: "I'd like to schedule a consultation" },
    { label: "About Zyora", action: "Tell me about Zyora AI Agency" },
  ];

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-foreground shadow-2xl flex items-center justify-center group overflow-hidden"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="relative"
            >
              <img
                src={zyoraLogo}
                alt="Zyora AI"
                className="w-10 h-10 object-contain"
              />
            </motion.div>
            <span className="absolute inset-0 rounded-full bg-foreground/30 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] rounded-3xl glass-panel border border-border/50 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-border/50 bg-secondary/40 backdrop-blur-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-background/50 border border-border/50 flex items-center justify-center overflow-hidden">
                  <img
                    src={zyoraLogo}
                    alt="Zyora AI"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-foreground flex items-center gap-2">
                    Zyora AI
                    <Sparkles className="w-3 h-3 text-foreground/50" />
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {isBookingMode ? "Scheduling consultation..." : "AI Assistant"}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-secondary/60 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Quick Actions */}
            {!isBookingMode && messages.length <= 2 && (
              <div className="px-4 py-3 border-b border-border/30 flex gap-2 overflow-x-auto">
                {quickActions.map((action, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setInput(action.action);
                      setTimeout(() => {
                        const fakeEvent = { key: "Enter", shiftKey: false, preventDefault: () => {} };
                        handleKeyPress(fakeEvent as React.KeyboardEvent);
                      }, 50);
                    }}
                    className="px-3 py-1.5 bg-secondary/40 border border-border/50 rounded-full text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all whitespace-nowrap"
                  >
                    {action.label}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                      message.isBot
                        ? "bg-secondary/60 border border-border/50 text-foreground"
                        : "bg-foreground text-background"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">
                      {message.text.split("**").map((part, i) =>
                        i % 2 === 1 ? (
                          <strong key={i} className="font-semibold">
                            {part}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary/60 border border-border/50 px-4 py-3 rounded-2xl flex items-center gap-1">
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <>
                        <motion.span
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 rounded-full bg-muted-foreground"
                        />
                        <motion.span
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 rounded-full bg-muted-foreground"
                        />
                        <motion.span
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 rounded-full bg-muted-foreground"
                        />
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50 bg-secondary/20 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    isBookingMode
                      ? bookingStep === "name"
                        ? "Enter your full name..."
                        : bookingStep === "email"
                        ? "Enter your email..."
                        : bookingStep === "company"
                        ? "Enter company name or 'skip'..."
                        : bookingStep === "message"
                        ? "Enter your message..."
                        : "Type yes or no..."
                      : "Ask me anything..."
                  }
                  disabled={isSubmitting || isTyping}
                  className="flex-1 bg-secondary/40 border-border/50 rounded-xl h-11 text-sm placeholder:text-muted-foreground focus:border-foreground/30 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim() || isSubmitting || isTyping}
                  className="w-11 h-11 rounded-xl bg-foreground text-background flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2">
                Powered by Zyora AI • Available 24/7
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
