"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  role: "assistant",
  content: "Hey! I'm OLO ✨ I know everything about Tharun. Ask me anything!",
};

export default function AiCompanion() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;

    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: "" },
    ]);
    setStreaming(true);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
        signal: ctrl.signal,
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            content: next[next.length - 1].content + chunk,
          };
          return next;
        });
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: "Something went wrong — try again 😅",
        };
        return next;
      });
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }, [input, streaming]);

  const toggle = () => {
    if (streaming) abortRef.current?.abort();
    setOpen((o) => !o);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 12,
      }}
    >
      {/* Chat panel */}
      {open && (
        <div
          style={{
            width: 320,
            height: 440,
            background: "#0d0d0d",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 18,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Sparkles size={13} style={{ color: "#a78bfa" }} />
              <span
                style={{ fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}
              >
                OLO
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.28)",
                  fontWeight: 400,
                }}
              >
                knows Tharun
              </span>
            </div>
            <button
              onClick={toggle}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.3)",
                display: "flex",
                padding: 2,
              }}
            >
              <X size={14} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 14px 6px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "86%",
                    padding: "8px 12px",
                    borderRadius:
                      msg.role === "user"
                        ? "14px 14px 3px 14px"
                        : "14px 14px 14px 3px",
                    fontSize: 13,
                    lineHeight: 1.55,
                    background: msg.role === "user" ? "#6d28d9" : "rgba(255,255,255,0.07)",
                    color: msg.role === "user" ? "#fff" : "rgba(255,255,255,0.88)",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.content || (streaming && i === messages.length - 1 ? (
                    <TypingDots />
                  ) : null)}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "10px 12px 13px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Ask about Tharun..."
              disabled={streaming}
              maxLength={500}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                padding: "8px 12px",
                fontSize: 13,
                color: "#fff",
                outline: "none",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "rgba(109,40,217,0.6)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")
              }
            />
            <button
              onClick={send}
              disabled={streaming || !input.trim()}
              style={{
                background: "#6d28d9",
                border: "none",
                borderRadius: 10,
                padding: "8px 11px",
                cursor: streaming || !input.trim() ? "not-allowed" : "pointer",
                opacity: streaming || !input.trim() ? 0.35 : 1,
                display: "flex",
                alignItems: "center",
                color: "#fff",
                transition: "opacity 0.15s",
                flexShrink: 0,
              }}
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={toggle}
        aria-label="Chat with OLO"
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          background: "#6d28d9",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          boxShadow: "0 4px 24px rgba(109,40,217,0.45)",
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(109,40,217,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(109,40,217,0.45)";
        }}
      >
        {open ? <X size={19} /> : <MessageSquare size={19} />}
      </button>
    </div>
  );
}

function TypingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center", height: 16 }}>
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.4)",
            display: "inline-block",
            animation: "olo-bounce 1.2s ease-in-out infinite",
            animationDelay: `${delay}ms`,
          }}
        />
      ))}
      <style>{`
        @keyframes olo-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </span>
  );
}
