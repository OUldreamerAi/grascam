"use client";
import { useState } from "react";
import { savedChatState, savedSelected, setSavedChatState, setSavedSelected, unlockEmailTarget, setBotDownloaded, botDownloaded } from "@/lib/state";

type ChatState = Record<string, { messages: { from: string; text: string }[]; currentNode: string }>;

const conversations: Record<string, {
  avatar: string;
  tree: Record<string, { response?: string; replies?: { text: string; next: string }[] }>;
}> = {
  "litle cousin": {
    avatar: "/litlecousin.png",
    tree: {
      start: {
        response: "Hello! Have you seen my research notes on radioactivity?",
        replies: [
          { text: "Yes! The work is brilliant.", next: "brilliant" },
          { text: "No, What are you talking about? Are you high or something?", next: "send" },
          { text: "I haven't had time yet. But please send them over.", next: "notime" },
        ],
      },
      brilliant:       { response: "Thank you! I've been working on it for years. Do you want to collaborate?", replies: [{ text: "I'd love to collaborate!", next: "collaborate_yes" }, { text: "I'm too busy right now.", next: "collaborate_no" }] },
      send:            { response: "Dont say you are one of the monkey people.", replies: [{ text: "No what are you talking about", next: "read_tonight" }, { text: "Yes I am monkeyyyyyy.", next: "summarise" }] },
      notime:          { response: "No worries, whenever you're ready. They're quite important though!", replies: [{ text: "I'll make time this weekend.", next: "weekend" }, { text: "Give me a quick summary.", next: "summarise" }] },
      collaborate_yes: { response: "Wonderful! Come to my lab on Monday. This will change science forever!", replies: [] },
      collaborate_no:  { response: "I understand. Perhaps another time. Goodbye!", replies: [] },
      read_tonight:    { response: "Good, they have yet to catch you.", replies: [] },
      summarise:       { response: "Nooooo they... YOU are gonna take over the world.", replies: [] },
      weekend:         { response: "Great! I'll be in the lab all weekend if you want to discuss them.", replies: [] },
    },
  },
  "Mom": {
    avatar: "/mom.png",
    tree: {
      start:          { response: "Hey sweety. How is university going?", replies: [{ text: "Great! Currently following a lecture", next: "joke" }, { text: "emm you see I got dropped out", next: "fascinated" }] },
      joke:           { response: "Thats awesome is it interesting?", replies: [{ text: "Yeah extremely.", next: "understands" }, { text: "Not really, but ill survive.", next: "confused" }] },
      fascinated:     { response: "Good joke you scared me for a moment there.", replies: [{ text: "Yeah it was just a joke.", next: "agreed" }, { text: "It was not a joke.", next: "time_will_tell" }] },
      agreed:         { response: "Well cant wait to see you on christmas holiday!", replies: [] },
      time_will_tell: { response: "WHATT!!!!", replies: [] },
      understands:    { response: "Thats good to hear. Cant wait to see you on christmas holiday!", replies: [] },
      confused:       { response: "Well I believe in you. Cant wait to see you on christmas holiday!", replies: [] },
    },
  },
  "friend": {
    avatar: "/frend.png",
    tree: {
      start: {
        response: "How are you doing? I heard you dropped out of school.",
        replies: [
          { text: "Not excellent, life is tough, just can't find work.", next: "joke" },
          { text: "Dont worry about me. I got a job like literally yesterday", next: "fascinated" },
        ],
      },
      joke:       { response: "Well what would you say if I told you that I have a way for you to make a ton of money?", replies: [{ text: "Id be really interested please continue", next: "agreed" }] },
      fascinated: { response: "Stop lying. I know you are in a bad spot. Let me help make you rich.", replies: [{ text: "Sure, I'm listening.", next: "agreed" }] },
      agreed: {
        response: "Have you ever heard of scamming? I know a website where you can learn everything. Go to scamschool.com in your browser.",
        replies: [{ text: "I checked it out, looks interesting!", next: "teach1" }],
      },
      teach1: {
        response: "Good! The trick is you don't manually find victims. Real scammers use bots that blast millions of emails automatically. Only the gullible ones reply those are your victims.",
        replies: [
          { text: "That's genius. How do I get one?", next: "offer_bot" },
          { text: "Isn't this wrong?", next: "ethics" },
        ],
      },
      ethics: {
        response: "Relax, it's just a game! None of these people are real. So, you want the bot or not?",
        replies: [{ text: "Okay fine, give me the bot.", next: "offer_bot" }],
      },
      offer_bot: {
        response: "I wrote one myself. It sends to millions of addresses automatically. You just write the hook email like 'I am a Nigerian prince' and it does the rest. The people who reply are your targets. Here's the download: [DOWNLOAD_SCAMBOT]",
        replies: [{ text: "Downloaded! What do I write in the email?", next: "hook_tips" }],
      },
      hook_tips: {
        response: "The hook email just needs to grab attention and sound slightly believable. Try things like winning a prize, a long lost inheritance, or a bank security alert. Keep it vague you want them to reply asking for more info. Then YOU do the actual scamming in the reply. Check your Email app!",
        replies: [{ text: "Got it. I'll try it out.", next: "good_luck" }],
      },
      good_luck: {
        response: "Good luck. The more people you scam, the better targets start appearing in your inbox. High-value targets are harder but worth way more. Come back if you need tips!",
        replies: [],
      },
    },
  },
};

type ConvoKey = keyof typeof conversations;

export default function MessagesContent() {
  const [selected, setSelected] = useState<string | null>(savedSelected);
  const [chatState, setChatState] = useState<ChatState>(savedChatState);
  const [downloaded, setDownloaded] = useState(botDownloaded);

  function updateChatState(newState: ChatState) {
    setSavedChatState(newState);
    setChatState(newState);
  }

  function openConversation(name: string) {
    setSavedSelected(name);
    setSelected(name);
    if (!savedChatState[name]) {
      const startNode = conversations[name as ConvoKey].tree["start"];
      updateChatState({
        ...savedChatState,
        [name]: {
          messages: startNode.response ? [{ from: "them", text: startNode.response }] : [],
          currentNode: "start",
        },
      });
    }
  }

  function handleDownload() {
    setBotDownloaded();
    setDownloaded(true);
  }

  function sendReply(replyText: string, nextNode: string) {
    if (!selected) return;
    const next = conversations[selected as ConvoKey].tree[nextNode];
    const current = savedChatState[selected];

    if (selected === "frend" && nextNode === "unlock_granny") {
      unlockEmailTarget("granny");
    }

    const newMessages = [
      ...current.messages,
      { from: "me", text: replyText },
      ...(next.response ? [{ from: "them", text: next.response }] : []),
    ];
    updateChatState({ ...savedChatState, [selected]: { messages: newMessages, currentNode: nextNode } });
  }

  const currentChat = selected ? chatState[selected] : null;
  const currentNode = selected && currentChat
    ? conversations[selected as ConvoKey].tree[currentChat.currentNode]
    : null;

  function renderMessage(text: string) {
    if (!text.includes("[DOWNLOAD_SCAMBOT]")) return <span>{text}</span>;
    const parts = text.split("[DOWNLOAD_SCAMBOT]");
    return (
      <span>
        {parts[0]}
        {downloaded ? (
          <span className="inline-block bg-green-100 text-green-700 border border-green-400 rounded px-2 py-0.5 text-xs font-bold mx-1">
          ScamBot.exe Downloaded
          </span>
        ) : (
          <button
            onClick={handleDownload}
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-0.5 text-xs font-bold mx-1 cursor-pointer"
          >
            ScamBot.exe Click to Download
          </button>
        )}
        {parts[1]}
      </span>
    );
  }

  return (
    <div className="flex gap-4 p-4 w-full text-black" style={{ height: "500px" }}>
      <div className="flex flex-col gap-2 min-w-0 overflow-y-auto bg-white my-2">
        {Object.keys(conversations).map((name) => (
          <section key={name} onClick={() => openConversation(name)}
            className={`flex border-2 justify-between items-center rounded-sm p-2 cursor-pointer
              ${selected === name ? "border-blue-400 bg-blue-50" : "border-black hover:bg-gray-100"}`}>
            <h2>{name}</h2>
            <img src={conversations[name as ConvoKey].avatar} alt={name} width={50} height={50} className="rounded-full" />
          </section>
        ))}
      </div>

      <div className="flex-[2] min-w-0 flex flex-col rounded-sm border border-gray-200 bg-white">
        {!selected ? (
          <p className="text-gray-400 text-center mt-8">Select a conversation</p>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-gray-800 border-b p-4">{selected}</h2>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {currentChat?.messages.map((msg, i) => (
                <div key={i} className={`max-w-[70%] p-2 rounded-lg text-sm
                  ${msg.from === "me" ? "self-end bg-blue-500 text-white" : "self-start bg-gray-100 text-black"}`}>
                  {msg.from === "them" ? renderMessage(msg.text) : msg.text}
                </div>
              ))}
            </div>
            <div className="border-t p-3 flex flex-col gap-2">
              {currentNode?.replies && currentNode.replies.length > 0 ? (
                <>
                  <p className="text-xs text-gray-400">Choose a reply:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentNode.replies.map((reply, i) => (
                      <button key={i} onClick={() => sendReply(reply.text, reply.next)}
                        className="text-sm border border-blue-400 text-blue-600 rounded-full px-3 py-1 hover:bg-blue-50 transition-colors">
                        {reply.text}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-xs text-gray-400 italic">Conversation ended.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}