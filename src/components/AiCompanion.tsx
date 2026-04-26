"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { marked } from "marked";
import OloPuppet from "./OloPuppet";

// ── Markdown ──────────────────────────────────────────────────────────────────
marked.use({ breaks: true });

function renderMarkdown(src: string): string {
  const raw = marked.parse(src);
  const html = typeof raw === "string" ? raw : "";
  // #5 – open all links in new tab
  return html.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');
}

// ── Types & constants ─────────────────────────────────────────────────────────
interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  role: "assistant",
  content: "Hey! I'm OLO ✨ I know everything about Tharun. Ask me anything!",
};

const SUGGESTIONS = [
  "What projects has Tharun built?",
  "Tell me about CROW",
  "What's his experience?",
  "What's he working on?",
];

// #11 – cycling placeholders
const PLACEHOLDERS = [
  "Ask anything...",
  "What has Tharun shipped?",
  "Tell me about his work...",
  "Any questions about Tharun?",
  "What's he passionate about?",
];

const SESSION_KEY = "olo-messages";
const MAX_INPUT   = 500;

// ── Global CSS ────────────────────────────────────────────────────────────────
const STYLE = `
@keyframes olo-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: .4; }
  40%            { transform: translateY(-5px); opacity: 1; }
}
@keyframes olo-msg-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes olo-send-bounce {
  0%   { transform: scale(1); }
  35%  { transform: scale(0.82); }
  70%  { transform: scale(1.12); }
  100% { transform: scale(1); }
}
@keyframes olo-puppet-pulse {
  0%   { box-shadow: 0 0 0 0   rgba(109,40,217,.65), 2px 2px 4px rgba(0,0,0,.27); }
  70%  { box-shadow: 0 0 0 13px rgba(109,40,217,0),   2px 2px 4px rgba(0,0,0,.27); }
  100% { box-shadow: 0 0 0 0   rgba(109,40,217,0),   2px 2px 4px rgba(0,0,0,.27); }
}
.olo-new  { animation: olo-msg-in 0.2s ease-out both; }
.olo-md p            { margin: 0 0 6px; font-size: 15px; line-height: 1.55; font-family: Inter,sans-serif; font-weight: 400; }
.olo-md p:last-child { margin: 0; }
.olo-md ul,.olo-md ol{ margin: 4px 0 8px 18px; padding: 0; }
.olo-md li           { margin: 2px 0; font-size: 15px; line-height: 1.55; font-family: Inter,sans-serif; }
.olo-md code         { background: rgba(255,255,255,.15); padding: 1px 4px; border-radius: 4px; font-size: 13px; }
.olo-md pre          { background: rgba(0,0,0,.3); padding: 10px; border-radius: 8px; overflow-x: auto; margin: 8px 0; }
.olo-md pre code     { background: none; padding: 0; }
.olo-md strong       { font-weight: 600; }
.olo-md a            { color: #a78bfa; text-decoration: underline; }
.olo-copy { opacity: 0; transition: opacity .15s; pointer-events: none; }
.olo-row:hover .olo-copy { opacity: 1; pointer-events: auto; }
@media (hover: none) { .olo-copy { opacity: 1; pointer-events: auto; } }
textarea.olo-ta::placeholder { color: rgba(0,0,0,.45); font-weight: 500; font-family: Inter,sans-serif; font-size: 15px; }
textarea.olo-ta { scrollbar-width: none; }
textarea.olo-ta::-webkit-scrollbar { display: none; }
.olo-scroll::-webkit-scrollbar       { width: 4px; }
.olo-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,.15); border-radius: 2px; }
`;

// ── AiCompanion ───────────────────────────────────────────────────────────────
export default function AiCompanion() {
  const [open, setOpen]             = useState(false);
  const [messages, setMessages]     = useState<Message[]>([WELCOME]);
  const [input, setInput]           = useState("");
  const [streaming, setStreaming]   = useState(false);
  const [showDown, setShowDown]     = useState(false);  // #3 smart scroll badge
  const [phIdx, setPhIdx]           = useState(0);      // #11 cycling placeholder
  const [sendBounce, setSendBounce] = useState(false);  // #14 send bounce
  const [isMobile, setIsMobile]     = useState(false);  // #22 full-screen mobile
  const [copied, setCopied]         = useState<number | null>(null); // #13 copy
  const [newFrom, setNewFrom]       = useState(1); // indices < newFrom skip entrance anim

  const scrollRef   = useRef<HTMLDivElement>(null);
  const bottomRef   = useRef<HTMLDivElement>(null);
  const taRef       = useRef<HTMLTextAreaElement>(null);
  const abortRef    = useRef<AbortController | null>(null);
  const atBottomRef = useRef(true);
  const swipeY      = useRef(0);

  // #22 mobile detect
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 400);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Session restore — avoids SSR hydration mismatch
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Message[];
        if (parsed.length > 0) {
          setMessages(parsed);
          setNewFrom(parsed.length); // restored messages skip entrance anim
        }
      }
    } catch {}
  }, []);

  // Focus textarea on open
  useEffect(() => {
    if (open) setTimeout(() => taRef.current?.focus(), 60);
  }, [open]);

  // Session save
  useEffect(() => {
    if (messages.length > 1) {
      try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages)); } catch {}
    }
  }, [messages]);

  // #11 cycling placeholder
  useEffect(() => {
    if (input) return;
    const t = setInterval(() => setPhIdx(i => (i + 1) % PLACEHOLDERS.length), 8000);
    return () => clearInterval(t);
  }, [input]);

  // #3 smart scroll — only auto-scroll when near bottom
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const near = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    atBottomRef.current = near;
    if (near) setShowDown(false);
  }, []);

  useEffect(() => {
    if (atBottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      setShowDown(true);
    }
  }, [messages]);

  // #6 textarea auto-grow (1–3 lines)
  const grow = useCallback(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "40px";
    ta.style.height = Math.min(ta.scrollHeight, 80) + "px";
  }, []);

  // Send
  const send = useCallback(async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || streaming) return;

    setInput("");
    if (taRef.current) taRef.current.style.height = "40px";

    // #14 send bounce
    setSendBounce(true);
    setTimeout(() => setSendBounce(false), 500);

    const history = messages
      .slice(1)
      .filter(m => m.content)
      .concat({ role: "user" as const, content });

    // #12 entrance anim — only new messages
    setMessages(prev => {
      setNewFrom(prev.length);
      return [...prev, { role: "user", content }, { role: "assistant", content: "" }];
    });
    setStreaming(true);
    atBottomRef.current = true;
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 0);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages(prev => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: next[next.length - 1].content + chunk };
          return next;
        });
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        // #2 stop — keep partial; remove if nothing was received
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last.role === "assistant" && !last.content) return prev.slice(0, -1);
          return prev;
        });
        return; // finally still runs
      }
      setMessages(prev => {
        const next = [...prev];
        next[next.length - 1] = { role: "assistant", content: "Something went wrong — try again 😅" };
        return next;
      });
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }, [input, streaming, messages]);

  // #2 stop streaming
  const stop = () => abortRef.current?.abort();

  const toggle = () => {
    if (streaming) abortRef.current?.abort();
    setOpen(o => !o);
  };

  // #13 copy message
  const copyMsg = async (content: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(idx);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  };

  const mobile = isMobile;

  return (
    <div style={{ position: "fixed", bottom: 40, right: 16, zIndex: 50 }}>
      <style>{STYLE}</style>

      {/* Backdrop */}
      {open && (
        <div
          onClick={toggle}
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
        />
      )}

      {/* Panel wrapper */}
      <div
        style={mobile ? {
          position: "fixed" as const,
          top: 0, left: 0, right: 0, bottom: 0,
          transformOrigin: "bottom center",
          transform: open ? "translateY(0)" : "translateY(100%)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "transform 0.3s ease, opacity 0.3s ease",
        } : {
          position: "absolute" as const,
          bottom: 0,
          right: 0,
          transformOrigin: "bottom right",
          transform: open ? "scale(1)" : "scale(0.9)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "transform 0.25s ease, opacity 0.25s ease",
        }}
      >
        {/* #21 ARIA dialog */}
        <div
          role="dialog"
          aria-labelledby="olo-title"
          aria-modal="true"
          style={{
            width:        mobile ? "100%" : 320,
            height:       mobile ? "100%" : 460,
            borderRadius: mobile ? 0 : 24,
            background: "white",
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            // #23 safe area insets (iOS keyboard)
            paddingBottom: mobile ? "env(safe-area-inset-bottom, 0px)" : undefined,
          }}
        >
          {/* Header — #24 swipe-to-close zone */}
          <div
            onTouchStart={e => { swipeY.current = e.touches[0].clientY; }}
            onTouchMove={e => { if (e.touches[0].clientY - swipeY.current > 80) toggle(); }}
            style={{
              height: 32,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <span
              id="olo-title"
              style={{ fontSize: 20, fontWeight: 700, color: "#000", fontFamily: "Inter, sans-serif" }}
            >
              OLO
            </span>
            <button
              onClick={toggle}
              aria-label="Close chat"
              style={{ position: "absolute", right: 12, top: 4, background: "none", border: "none", cursor: "pointer", display: "flex", padding: 4 }}
            >
              <img src="/olo/chat/close-button.svg" width={16} height={16} alt="" draggable={false} />
            </button>
          </div>

          {/* #21 ARIA live region for messages */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            aria-live="polite"
            aria-label="Chat messages"
            className="olo-scroll"
            style={{
              flex: 1,
              margin: "0 12px",
              background: "#D9D9D9",
              borderRadius: 14,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              padding: 14,
              boxSizing: "border-box",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={["olo-row", i >= newFrom ? "olo-new" : ""].join(" ").trim()}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div style={{
                  maxWidth: "88%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                }}>
                  {/* Bubble */}
                  <div style={{
                    padding: "10px 14px",
                    borderRadius: 16,
                    background: msg.role === "user" ? "#6D28D9" : "#1F1F1F",
                    color: "#fff",
                    wordBreak: "break-word",
                  }}>
                    {msg.role === "assistant" ? (
                      msg.content
                        ? (
                          /* #1 markdown rendering / #5 clickable links */
                          <div
                            className="olo-md"
                            dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                          />
                        )
                        : (streaming && i === messages.length - 1 ? <TypingDots /> : null)
                    ) : (
                      <span style={{ fontSize: 15, lineHeight: 1.55, fontFamily: "Inter, sans-serif", fontWeight: 400, whiteSpace: "pre-wrap" }}>
                        {msg.content}
                      </span>
                    )}
                  </div>

                  {/* #13 copy button — revealed on hover */}
                  {msg.content && (
                    <button
                      className="olo-copy"
                      onClick={() => copyMsg(msg.content, i)}
                      style={{
                        marginTop: 3,
                        background: "rgba(0,0,0,.25)",
                        border: "none",
                        borderRadius: 6,
                        padding: "2px 8px",
                        fontSize: 10,
                        color: "#fff",
                        cursor: "pointer",
                        fontFamily: "Inter, sans-serif",
                        lineHeight: 1.5,
                      }}
                    >
                      {copied === i ? "✓ Copied" : "Copy"}
                    </button>
                  )}
                </div>

                {/* Suggestions — shown only with the welcome message */}
                {i === 0 && messages.length === 1 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                    {SUGGESTIONS.map(q => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        style={{
                          background: "rgba(109,40,217,.10)",
                          border: "1px solid rgba(109,40,217,.25)",
                          borderRadius: 10,
                          padding: "5px 10px",
                          fontSize: 12,
                          color: "#1c1c1e",
                          cursor: "pointer",
                          textAlign: "left",
                          lineHeight: 1.4,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />

            {/* #3 scroll-to-bottom badge */}
            {showDown && (
              <button
                onClick={() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); setShowDown(false); }}
                style={{
                  position: "sticky",
                  bottom: 4,
                  alignSelf: "center",
                  background: "#1F1F1F",
                  color: "#fff",
                  border: "none",
                  borderRadius: 20,
                  padding: "4px 12px",
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  boxShadow: "0 2px 8px rgba(0,0,0,.3)",
                }}
              >
                ↓ New messages
              </button>
            )}
          </div>

          {/* Input row */}
          <div style={{ display: "flex", alignItems: "flex-end", padding: "11px 12px 13px", gap: 9, flexShrink: 0 }}>
            {/* #6 auto-grow textarea / #10 not disabled during streaming / #11 cycling placeholder */}
            <textarea
              ref={taRef}
              className="olo-ta"
              value={input}
              placeholder={PLACEHOLDERS[phIdx]}
              onChange={e => { setInput(e.target.value); grow(); }}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              maxLength={MAX_INPUT}
              rows={1}
              style={{
                flex: 1,
                height: 40,
                minHeight: 40,
                maxHeight: 80,
                background: "#D9D9D9",
                borderRadius: 50,
                border: "none",
                outline: "none",
                paddingLeft: 14,
                paddingRight: 14,
                paddingTop: 10,
                paddingBottom: 10,
                fontSize: 15,
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                color: "#000",
                boxSizing: "border-box",
                resize: "none",
                overflowY: "hidden",
              }}
            />

            {/* #2 stop button / #14 send bounce */}
            <button
              onClick={streaming ? stop : () => send()}
              aria-label={streaming ? "Stop" : "Send"}
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                flexShrink: 0,
                animation: sendBounce ? "olo-send-bounce 0.5s ease-out" : undefined,
              }}
            >
              {streaming ? (
                <StopButton />
              ) : input.trim() ? (
                <img src="/olo/chat/send-button.svg" width={42} height={42} alt="" draggable={false} style={{ display: "block", pointerEvents: "none" }} />
              ) : (
                <InChatPuppet open={open} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Floating puppet */}
      <OloPuppet chatOpen={open} onToggle={toggle} />
    </div>
  );
}

// ── Stop button ───────────────────────────────────────────────────────────────
function StopButton() {
  return (
    <div style={{
      width: 42, height: 42, borderRadius: "50%",
      background: "#1F1F1F",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ width: 14, height: 14, background: "#fff", borderRadius: 3 }} />
    </div>
  );
}

// ── InChatPuppet — two-layer crossfade ────────────────────────────────────────
const CHAT_IDLE = "/olo/chat/olo-puppet.svg";
const BIG_EYE = [
  "/olo/olo-animations/big-eye/big-eye-01.png",
  "/olo/olo-animations/big-eye/big-eye-02.png",
  "/olo/olo-animations/big-eye/big-eye-03.png",
];
const CHAT_BLINK = [
  "/olo/olo-animations/blinking/blinking-01.svg",
  "/olo/olo-animations/blinking/blinking-02.svg",
  "/olo/olo-animations/blinking/blinking-03.svg",
];

const CROSSFADE_MS = 50;

function InChatPuppet({ open }: { open: boolean }) {
  const refA      = useRef<HTMLImageElement>(null);
  const refB      = useRef<HTMLImageElement>(null);
  const bOnTopRef = useRef(false);
  const genRef    = useRef(0);

  useEffect(() => {
    [...BIG_EYE, ...CHAT_BLINK].forEach(s => { new Image().src = s; });
  }, []);

  useEffect(() => {
    const gen = ++genRef.current;
    const a   = refA.current!;
    const b   = refB.current!;

    function reset() {
      a.style.transition = "none"; a.style.opacity = "1"; a.src = CHAT_IDLE;
      b.style.transition = "none"; b.style.opacity = "0"; b.src = CHAT_IDLE;
      bOnTopRef.current  = false;
    }

    function show(newSrc: string, transMs: number) {
      if (genRef.current !== gen) return;
      const incoming = bOnTopRef.current ? a : b;
      const outgoing = bOnTopRef.current ? b : a;
      bOnTopRef.current = !bOnTopRef.current;

      incoming.src = newSrc;
      incoming.style.transition = "none";
      incoming.style.opacity    = "0";
      void incoming.offsetHeight; // force reflow — critical for transition to fire
      incoming.style.transition = `opacity ${transMs}ms ease-out`;
      incoming.style.opacity    = "1";
      outgoing.style.transition = `opacity ${transMs}ms ease-out`;
      outgoing.style.opacity    = "0";
    }

    function after(ms: number, fn: () => void) {
      setTimeout(() => { if (genRef.current === gen) fn(); }, ms);
    }

    function playTimed(frames: [string, number, number][], onDone: () => void) {
      let i = 0;
      function tick() {
        if (genRef.current !== gen) return;
        if (i >= frames.length) { onDone(); return; }
        const [src, holdMs, transMs] = frames[i++];
        show(src, transMs);
        setTimeout(tick, transMs + holdMs);
      }
      tick();
    }

    if (!open) {
      reset();
      return () => { genRef.current++; };
    }

    const FADE = CROSSFADE_MS;

    const bigEyeSeq: [string, number, number][] = [
      [BIG_EYE[0],    60, FADE],
      [BIG_EYE[1],    60, FADE],
      [BIG_EYE[2], 1200, FADE],
    ];

    const blinkHalf: [string, number, number][] = [
      [CHAT_BLINK[0],   50, 0],
      [CHAT_BLINK[1],   50, 0],
      [CHAT_BLINK[2], 1500, 0],
      [CHAT_BLINK[1],   50, 0],
      [CHAT_BLINK[0],   50, 0],
    ];

    function blinkLoop() {
      after(2000 + Math.random() * 5000, () =>
        playTimed(blinkHalf, () =>
          after(150, () =>
            playTimed(blinkHalf, () => {
              show(CHAT_IDLE, 0);
              blinkLoop();
            })
          )
        )
      );
    }

    playTimed(bigEyeSeq, () => {
      show(CHAT_IDLE, FADE);
      after(FADE + 100, blinkLoop);
    });

    return () => { genRef.current++; reset(); };
  }, [open]);

  const base: React.CSSProperties = {
    position: "absolute", top: 0, left: 0,
    display: "block", pointerEvents: "none",
    willChange: "opacity",
  };

  return (
    <div style={{ position: "relative", width: 42, height: 42 }}>
      <img ref={refA} src={CHAT_IDLE} width={42} height={42} alt="" draggable={false} style={{ ...base, opacity: 1 }} />
      <img ref={refB} src={CHAT_IDLE} width={42} height={42} alt="" draggable={false} style={{ ...base, opacity: 0 }} />
    </div>
  );
}

// ── TypingDots ────────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center", height: 16 }}>
      {[0, 150, 300].map(delay => (
        <span
          key={delay}
          style={{
            width: 5, height: 5,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.5)",
            display: "inline-block",
            animation: "olo-bounce 1.2s ease-in-out infinite",
            animationDelay: `${delay}ms`,
          }}
        />
      ))}
    </span>
  );
}
