"use client";
import { useChat } from "@ai-sdk/react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send } from "lucide-react";
import { ReactNode, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LoadingDots from "./loadingDots";

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    // stop,
    reload,
    error,
  } = useChat({
    api: "/api/gemini",
    initialMessages: [
      {
        id: "initial-message",
        role: "assistant",
        content:
          "Assalamualaikum! I'm your Ramadan Guide. How can I help you today?",
      },
    ],
  });
  const msgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <Card className="rounded-2xl border-purple-700 border-opacity-5 border lg:w-3/4 flex-grow flex flex-col bg-[url('/bg.png')] bg-cover h-[calc(100vh-2rem)] overflow-hidden">
      <CardContent className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="flex flex-col gap-5 p-3 sm:p-8 h-full">
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`flex mb-4 items-end ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-[2px] ml-2 flex w-full">
                  {message.role === "user" ? (
                    <span className="flex justify-end w-full mr-2">You</span>
                  ) : (
                    "Assistant"
                  )}
                </span>

                <div
                  className={`max-w-xl break-words p-4 ${
                    message.role === "user"
                      ? "bg-violet-600 text-white rounded-t-2xl rounded-l-2xl"
                      : "bg-white text-black rounded-b-2xl rounded-r-2xl shadow-md"
                  }`}
                >
                  <div className="prose prose-sm max-w-none">
                  <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: ({
          inline,
          children,
          ...props
        }: {
          inline?: boolean;
          children?: ReactNode;
        }) => {
          const bgColor =
            message.role === "user" ? "bg-violet-500" : "bg-gray-100";

          return inline ? (
            <code {...props} className={`px-1 rounded ${bgColor}`}>
              {children}
            </code>
          ) : (
            <pre className={bgColor}>
              <code {...props} className="block p-2 rounded">
                {children}
              </code>
            </pre>
          );
        },
        p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
        ul: ({ children }) => <ul className="list-disc ml-4 mb-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal ml-4 mb-1">{children}</ol>,
      }}
    >
      {message.content}
    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && <LoadingDots />}
          {error && (
            <div className="w-full items-center flex justify-center gap-3">
              <p className="text-xs text-red-500">An error occured!</p>
              <button
                className="underline"
                type="button"
                onClick={() => reload()}
              >
                Retry
              </button>
            </div>
          )}
          <div ref={msgRef}></div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-3 sm:p-6 border-t ">
        <form onSubmit={handleSubmit} className="w-full relative">
          <Input
            value={input}
            onChange={handleInputChange}
            className="w-full h-full resize-none rounded-full border border-slate-900/10 bg-white pl-6 pr-24 py-[25px] text-base font-medium placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]"
            required
            placeholder="Type your message here..."
          />
          <Button
            type="submit"
            className="flex w-14 h-14 items-center justify-center rounded-full px-3 text-sm  bg-violet-600 font-semibold text-white hover:bg-violet-700 active:bg-violet-800 absolute right-2 bottom-2 disabled:bg-violet-100 disabled:text-violet-400"
            disabled={isLoading}
            size={"icon"}
          >
            <Send className="size-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
