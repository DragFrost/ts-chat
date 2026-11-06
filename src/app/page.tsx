'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useState } from 'react';

import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Message, MessageContent } from "@/components/ui/message";
import { ArrowUpIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();
  const formRef = useRef<HTMLFormElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if Enter was pressed WITHOUT the Shift key
    if (event.key === "Enter" && !event.shiftKey && input.trim() !== "") {
      event.preventDefault(); // Stop a new line from forming
      formRef.current?.requestSubmit(); // Triggers the form's onSubmit event safely
    }
  };


  return (
    <div className="flex flex-col w-full pt-24 pb-3 mx-auto stretch justify-between gap-3 h-full">
      <div>
        {messages.map(message => (
          <div key={message.id} className="whitespace-pre-wrap">
            {
              message.role === 'user' ? (
                <Message align="end">
                  <MessageContent>
                    <Bubble align="end" variant="muted">
                      <BubbleContent>{message.parts.map((part: any) => part.text)}</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              ) : (
                <Message align="start">
                  <MessageContent>
                    <Bubble align="start" variant="muted">
                      <BubbleContent>{message.parts.map((part: any) => part.text)}</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              )
            }
          </div>
        ))}
      </div>

      <form
        ref={formRef}
        className="w-full"
        onSubmit={e => {
          e.preventDefault();
          if (input.trim() === '') return;
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <InputGroup>
          <InputGroupTextarea placeholder="Say something..." value={input} onKeyDown={handleKeyDown} onChange={e => setInput(e.currentTarget.value)} />
          <InputGroupAddon align="block-end">

            <InputGroupButton type="submit" variant="default" size="sm" className="ml-auto" disabled={input.trim() === ''}>
              <ArrowUpIcon className="w-5! h-8!" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  );
}