
'use client';

import { useChat } from '@ai-sdk/react';
import type { UIMessage } from 'ai';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion';
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Message, MessageContent } from "@/components/ui/message";
import { ArrowUpIcon, Sparkles } from "lucide-react";

const STORAGE_KEY = "product-chat-history";

export default function Chat() {
  const [input, setInput] = useState('');
  const [historyLoaded, setHistoryLoaded] = useState(false);

  const { messages, setMessages, sendMessage, status } = useChat();

  const formRef = useRef<HTMLFormElement>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Restore chat history
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem(STORAGE_KEY);

      if (savedMessages) {
        const parsedMessages: UIMessage[] = JSON.parse(savedMessages);

        if (Array.isArray(parsedMessages)) {
          setMessages(parsedMessages.slice(-4));
        }
      }
    } catch (error) {
      console.error("Failed to restore chat history:", error);
      localStorage.removeItem(STORAGE_KEY);
    }

    setHistoryLoaded(true);
  }, [setMessages]);

  // Save last 4 messages
  useEffect(() => {
    if (!historyLoaded) return;

    const lastFourMessages = messages.slice(-4);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(lastFourMessages)
    );
  }, [messages, historyLoaded]);

  useEffect(() => {
    if (!historyLoaded) return;

    formRef.current?.scrollIntoView({
      behavior: status === 'streaming' ? 'auto' : 'smooth',
      block: 'end',
    });
  }, [messages, status, historyLoaded]);

  const suggestions = [
    "What are the key ingredients in SBU-Grow Care?",
    "What is the dosage of Vitamin D3 in the product mentioned?",
  ];

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey && input.trim() !== "") {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage({ text: suggestion });
  };

  return (
    <div className="flex flex-col w-full pt-24 mx-auto stretch justify-between gap-3 h-full">
      <div>
        {messages.map((message) => {
          const text = message.parts
            .filter((part) => part.type === "text")
            .map((part) => part.text)
            .join("");

          return (
            <div key={message.id} className="mb-3">
              <Message align={message.role === 'user' ? 'end' : 'start'}>
                <MessageContent>
                  <Bubble
                    align={message.role === 'user' ? 'end' : 'start'}
                    variant="muted"
                  >
                    <BubbleContent className="leading-7.5">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {text}
                      </ReactMarkdown>

                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            </div>
          );
        })}
        {status === 'submitted' && (
          <Message align="start">
            <MessageContent>
              <Bubble align="start" variant="muted">
                <BubbleContent>
                  <div className="flex items-center gap-3 py-1">
                    <Sparkles className="size-4 text-[#7ccf00] animate-pulse" />

                    <span className="text-sm text-muted-foreground">
                      Thinking
                    </span>

                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="size-1.5 rounded-full bg-[#7ccf00] animate-bounce"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        )}

        {status === 'error' && (
          <p className="text-sm text-destructive">
            Something went wrong. Please try again.
          </p>
        )}
      </div>

      <form
        ref={formRef}
        className="w-full pb-3"
        onSubmit={(e) => {
          e.preventDefault();

          if (input.trim() === '') return;

          sendMessage({ text: input });
          setInput('');
        }}
      >
        {messages.length === 0 && (
          <div className="mb-3 w-full min-w-0 overflow-x-auto overscroll-x-contain scrollbar-none">
            <Suggestions className="flex w-max flex-nowrap gap-2">
              {suggestions.map((suggestion) => (
                <Suggestion
                  key={suggestion}
                  onClick={handleSuggestionClick}
                  suggestion={suggestion}
                />
              ))}
            </Suggestions>
          </div>
        )}

        <InputGroup>
          <InputGroupTextarea
            placeholder="Say something..."
            ref={inputRef}
            value={input}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInput(e.currentTarget.value)}
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton
              type="submit"
              variant="default"
              size="sm"
              className="ml-auto"
              disabled={input.trim() === ''}
            >
              <ArrowUpIcon className="w-5! h-8!" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  );
}
