"use client";
import { useState, useEffect, useRef, ReactNode } from "react";


type AppType = "welcome" | "notebook" | "calculator" | "browser" | "email" | "messages" | "calender";

interface WindowInstance {
  id: number;
  type: AppType;
  zIndex: number;
}

let nextWindowId = 0;
let highestZIndex = 1;
let notes = "";
let money = 0;
let savedChatState: Record<string, {
  messages: {from: string, text: string}[],
  currentNode: string,
}> = {};
let savedSelected: string | null = null;


interface WindowShellProps {
  id: number;
  title: string;
  zIndex: number;
  onClose: (id: number) => void;
  onFocus: (id: number) => void;
  children: ReactNode;
}

function WindowShell({ id, title, zIndex, onClose, onFocus, children }: WindowShellProps) {
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const windowElement = windowRef.current;
    if (!windowElement) return;

    let lastMouseX = 0;
    let lastMouseY = 0;

    function onDrag(e: MouseEvent) {
      e.preventDefault();
      if (!windowElement) return;

      const moveX = e.clientX - lastMouseX;
      const moveY = e.clientY - lastMouseY;

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      windowElement.style.left = windowElement.offsetLeft + moveX + "px";
      windowElement.style.top = windowElement.offsetTop + moveY + "px";
    }

    function stopDragging() {
      document.onmousemove = null;
      document.onmouseup = null;
    }

    function startDragging(e: MouseEvent) {
      e.preventDefault();
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      document.onmousemove = onDrag;
      document.onmouseup = stopDragging;
    }

    const header = windowElement.querySelector<HTMLElement>(".window-header");
    if (header) header.onmousedown = startDragging;

    return () => {
      if (header) header.onmousedown = null;
    };
  }, []);

  return (
    <div
      ref={windowRef}
      onMouseDown={() => onFocus(id)}
      style={{ zIndex }}
      className="border-black border-2 w-1/2 rounded-lg absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-white"
    >
      <div
        className="window-header flex justify-between items-center px-4 py-2 cursor-move select-none"
        style={{ backgroundColor: "rgba(206, 201, 201, 0.38)" }}
      >
        <p className="text-black">{title}</p>
        <button
          className="text-black font-bold hover:text-red-500"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => onClose(id)}
        >
          ✕
        </button>
      </div>

      {children}
    </div>
  );
}


function WelcomeContent() {
  return (
    <>
      <h1 className="text-5xl font-bold m-8 p-8 text-black">
        Welcome to <strong>Scam the Granny</strong>
      </h1>
      <img className="w-1/2 m-8 p-8" src="/scamlogo3.png" alt="logo" />
      <p className="text-lg mt-4 m-8 p-8 text-black">
        This is a game where it is your goal to scam people out of their hard earned money.
        (Don't worry they aren't real, just AI (<s>or are they</s>))
      </p>
    </>
  );
}

function NotebookContent() {
  const [text, setText] = useState(notes);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    notes = e.target.value;   // save to module-level var
    setText(e.target.value);  // update local state
  }

  return (
    <div className="m-4 p-4">
      <h1 className="text-3xl font-bold mb-4 text-black">Notebook</h1>
      <textarea
        className="w-full h-64 border border-gray-300 rounded p-2 text-black resize-none"
        placeholder="Write something..."
        value={text}
        onChange={handleChange}
      />
    </div>
  );
}

function CalculatorContent() {
  const [display, setDisplay] = useState("0");

  function appendNumber(num: string) {
    setDisplay((prev) => prev === "0" ? num : prev + num);
  }

  function appendOperation(op: string) {
    setDisplay((prev) => prev + op);
  }

  function clearDisplay() {
    setDisplay("0");
  }

  function calculate() {
    try {
      const result = eval(display);
      setDisplay(String(result));
    } catch {
      setDisplay("Error");
    }
  }

  return (
    <div className="p-4 flex flex-col items-center gap-3 text-4xl" style={{ fontFamily: "var(--font-myfont)" }}>
      <input
        type="text"
        disabled
        value={display}
        className="w-full border-2 border-gray-300 rounded p-3 text-right text-2xl font-mono text-black bg-gray-50"
      />

      <div className="grid grid-cols-4 gap-2 w-full">
        <button onClick={clearDisplay}        className="col-span-2 bg-red-400 hover:bg-red-500 text-white rounded p-3 font-bold">C</button>
        <button onClick={() => appendOperation('/')} className="bg-orange-400 hover:bg-orange-500 text-white rounded p-3 font-bold">/</button>
        <button onClick={() => appendOperation('*')} className="bg-orange-400 hover:bg-orange-500 text-white rounded p-3 font-bold">*</button>

        <button onClick={() => appendNumber('7')} className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">7</button>
        <button onClick={() => appendNumber('8')} className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">8</button>
        <button onClick={() => appendNumber('9')} className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">9</button>
        <button onClick={() => appendOperation('-')} className="bg-orange-400 hover:bg-orange-500 text-white rounded p-3 font-bold">-</button>

        <button onClick={() => appendNumber('4')} className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">4</button>
        <button onClick={() => appendNumber('5')} className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">5</button>
        <button onClick={() => appendNumber('6')} className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">6</button>
        <button onClick={() => appendOperation('+')} className="bg-orange-400 hover:bg-orange-500 text-white rounded p-3 font-bold">+</button>

        <button onClick={() => appendNumber('1')} className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">1</button>
        <button onClick={() => appendNumber('2')} className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">2</button>
        <button onClick={() => appendNumber('3')} className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">3</button>
        <button onClick={() => appendNumber('0')} className="bg-gray-200 hover:bg-gray-300 text-black rounded p-3 font-bold">0</button>

        <button onClick={calculate} className="col-span-4 bg-blue-500 hover:bg-blue-600 text-white rounded p-3 font-bold text-xl">=</button>
      </div>
    </div>
  );
}

function BrowserContent() {
  const [text, setText] = useState("");

  return (
    <div className="m-4 p-4">
      <h1 className="text-3xl font-bold mb-4 text-black">browser</h1>
      <textarea
        className="w-full h-64 border border-gray-300 rounded p-2 text-black resize-none"
        placeholder="Write something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}

function EmailContent() {
  const [text, setText] = useState("");

  return (
    <div className="m-4 p-4">
      <h1 className="text-3xl font-bold mb-4 text-black">Email</h1>
      <textarea
        className="w-full h-64 border border-gray-300 rounded p-2 text-black resize-none"
        placeholder="Write something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}

function MessagesContent() {
  const [selected, setSelected] = useState<string | null>(savedSelected);
  const [chatState, setChatState] = useState(savedChatState);

  function updateChatState(newState: typeof savedChatState) {
    savedChatState = newState;
    setChatState(newState);
  }

  function openConversation(name: string) {
    savedSelected = name;
    setSelected(name);
    if (!savedChatState[name]) {
      const startNode = conversations[name as ConvoKey].tree["start"];
      updateChatState({
        ...savedChatState,
        [name]: {
          messages: startNode.response
            ? [{ from: "them", text: startNode.response }]
            : [],
          currentNode: "start",
        },
      });
    }
  }

  function sendReply(replyText: string, nextNode: string) {
    if (!selected) return;
    const tree = conversations[selected as ConvoKey].tree;
    const next = tree[nextNode];

    const current = savedChatState[selected];
    const newMessages = [
      ...current.messages,
      { from: "me", text: replyText },
      ...(next.response ? [{ from: "them", text: next.response }] : []),
    ];

    updateChatState({
      ...savedChatState,
      [selected]: {
        messages: newMessages,
        currentNode: nextNode,
      },
    });
  }
  const conversations: Record<string, {
    avatar: string,   
    tree: Record<string, {
      response?: string,        
      replies?: {text: string, next: string}[], 
    }>,
  }> = {
    "litle cousin": {
      avatar: "/litlecousin.png",
      tree: {
        start: {
          response: "Hello! Have you seen my research notes on radioactivity?",
          replies: [
            { text: "Yes! The work is brilliant.", next: "brilliant" },
            { text: "No, What are you talking about? Are you high or somehting?", next: "send" },
            { text: "I haven't had time yet. But please send the over.", next: "notime" },
          ],
        },
        brilliant: {
          response: "Thank you! I've been working on it for years. Do you want to collaborate?",
          replies: [
            { text: "I'd love to collaborate!", next: "collaborate_yes" },
            { text: "I'm too busy right now.", next: "collaborate_no" },
          ],
        },
        send: {
          response: "Dont say you are one of the monkey people.",
          replies: [
            { text: "No what are you talking about", next: "read_tonight" },
            { text: "Yes I am monkeyyyyyy.", next: "summarise" },
          ],
        },
        notime: {
          response: "No worries, whenever you're ready. They're quite important though!",
          replies: [
            { text: "I'll make time this weekend.", next: "weekend" },
            { text: "Give me a quick summary.", next: "summarise" },
          ],
        },
        collaborate_yes: {
          response: "Wonderful! Come to my lab on Monday. This will change science forever!",
          replies: [],  
        },
        collaborate_no: {
          response: "I understand. Perhaps another time. Goodbye!",
          replies: [],
        },
        read_tonight: {
          response: "Goo they have yet to katch you.",
          replies: [],
        },
        summarise: {
          response: "Nooooo they... YOU are gona take over the world.",
          replies: [],
        },
        weekend: {
          response: "Great! I'll be in the lab all weekend if you want to discuss them.",
          replies: [],
        },
      },
    },
    "Mom": {
      avatar: "/mom.png",
      tree: {
        start: {
          response: "Hey sweety. How is university going?",
          replies: [
            { text: "Great! Curently following a lecture", next: "joke" },
            { text: "emm you see I got droped out", next: "fascinated" },
          ],
        },
        joke: {
          response: "Thats awesome is it intrestin?",
          replies: [
            { text: "Yeah extreamly.", next: "understands" },
            { text: "Not really, but ill survive.", next: "confused" },
          ],
        },
        fascinated: {
          response: "Good joke you scared me for a moment there.",
          replies: [
            { text: "Yeah it was just a joke.", next: "agreed" },
            { text: "It was not a joke.", next: "time_will_tell" },
          ],
        },
        agreed: {
          response: "Well cant wait to see you on christmasholiday!",
          replies: [],
        },
        time_will_tell: {
          response: "WHATT!!!!",
          replies: [],
        },
        understands: {
          response: "Thats good to hear. Cant wait to see you on christmasholiday!",
          replies: [],
        },
        confused: {
          response: "Well I belive in you. Cant wait to see you on christmasholiday!",
          replies: [],
        },
      },
    },
    "frend": {
      avatar: "/frend.png",
      tree: {
        start: {
          response: "How are you doing? I heard you droped out of school.",
          replies: [
            { text: "Not exelent life is stuff, juts can find work.", next: "joke" },
            { text: "Dont worry about me. I got a job like litarally yesterday", next: "fascinated" },
          ],
        },
        joke: {
          response: "Well what would you sau if I told you that I hvae a way for you to make a ton of money",
          replies: [
            { text: "Id be rally intrested please continue", next: "agreed" },
          ],
        },
        fascinated: {
          response: "Good joke you scared Stop lying I nkow you are in a bad spot. Let me help make you ritch.",
          replies: [
            { text: "Sure", next: "agreed" },
          ],
        },
        agreed: {
          response: "Have uou ever heard of scamming",
          replies: [],
        },

      },
    },
  };

  type ConvoKey = keyof typeof conversations;



  const currentChat = selected ? chatState[selected] : null;
  const currentNode = selected && currentChat
    ? conversations[selected as ConvoKey].tree[currentChat.currentNode]
    : null;

  return (
    <div className="flex gap-4 p-4 w-full text-black" style={{ height: "500px" }}>

      <div className="flex flex-col gap-2 min-w-0 overflow-y-auto bg-white my-2">
        {Object.keys(conversations).map((name) => (
          <section
            key={name}
            onClick={() => openConversation(name)}
            className={`flex border-2 justify-between items-center rounded-sm p-2 cursor-pointer
              ${selected === name ? "border-blue-400 bg-blue-50" : "border-black hover:bg-gray-100"}`}
          >
            <h2>{name}</h2>
                <img
      src={conversations[name as ConvoKey].avatar} 
      alt={name}
      width={50}
      height={50}
      className="rounded-full"   
    />
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
                <div
                  key={i}
                  className={`max-w-[70%] p-2 rounded-lg text-sm
                    ${msg.from === "me"
                      ? "self-end bg-blue-500 text-white"
                      : "self-start bg-gray-100 text-black"}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="border-t p-3 flex flex-col gap-2">
              {currentNode?.replies && currentNode.replies.length > 0 ? (
                <>
                  <p className="text-xs text-gray-400">Choose a reply:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentNode.replies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => sendReply(reply.text, reply.next)}
                        className="text-sm border border-blue-400 text-blue-600 rounded-full px-3 py-1 hover:bg-blue-50 transition-colors"
                      >
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

function CalenderContent() {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  const year = now.getFullYear();
  

  const monthNames = [
    'january','february','march','april','may','june',
    'july','august','september','october','november','december'
  ];

  const firstDayRaw = new Date(year, month, 1).getDay();
  const firstDayMon = firstDayRaw === 0 ? 6 : firstDayRaw - 1;

  const dayIndex = firstDayMon + day - 1;
  const row = Math.floor(dayIndex / 7);
  const col = dayIndex % 7;


  const gridTop = 24;      
  const rowHeight = 10.4;    
  const gridLeft = 4.8;   
  const colWidth = 12.9;  

const circleLeft = gridLeft + (col + 0.5) * colWidth;
const circleTop = gridTop + (row + 0.5) * rowHeight;

  return (
    <div className="relative select-none">
      <img
        src={`/${monthNames[month]}.png`}
        className="w-full"
        alt={monthNames[month]}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "11%",
          aspectRatio: "1 / 1",
          backgroundColor: "rgba(255, 80, 80, 0.35)",
          border: "3px solid rgba(255, 50, 50, 0.7)",
          top: `${circleTop}%`,
          left: `${circleLeft}%`,
          transform: "translate(-50%, 0)",
        }}
      />
    </div>
  );
}





const APP_REGISTRY: Record<AppType, { title: string; Content: () => ReactNode }> = {
  welcome:  { title: "Welcome",  Content: WelcomeContent },
  notebook: { title: "Notebook", Content: NotebookContent },
  calculator: { title: "Calculator", Content: CalculatorContent },
  browser: { title: "Browser", Content: BrowserContent },
  email: { title: "Email", Content: EmailContent },
  messages: { title: "Messages", Content: MessagesContent },
  calender: { title: "Calender", Content: CalenderContent },
};



export default function Home() {
  const [currentTime, setCurrentTime] = useState("");
  const [openWindows, setOpenWindows] = useState<WindowInstance[]>([]);

  
  useEffect(() => {
    function updateClock() {
      setCurrentTime(new Date().toLocaleString());
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  function openApp(type: AppType) {
    const newWindow: WindowInstance = {
      id: nextWindowId++,
      type: type,
      zIndex: ++highestZIndex,
    };

    setOpenWindows((prevWindows) => [...prevWindows, newWindow]);
  }

  function closeWindow(id: number) {
    function isNotTheWindowBeingClosed(window: WindowInstance) {
      return window.id !== id;
    }

    setOpenWindows((prevWindows) => prevWindows.filter(isNotTheWindowBeingClosed));
  }

  function focusWindow(id: number) {
    function bringWindowToFront(window: WindowInstance) {
      if (window.id === id) {
        return { ...window, zIndex: ++highestZIndex };
      } else {
        return window;
      }
    }

    setOpenWindows((prevWindows) => prevWindows.map(bringWindowToFront));
  }

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/desktopbackground.png')" }}>

      <div className="flex justify-between relative z-[9999] text-black pointer-events-none items-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.48)"}}>
        <button className="m-2 text-5xl pointer-events-auto" onClick={() => openApp("welcome")}>
          ScamOS
        </button>
        <p className="m-2 text-3xl">{currentTime}</p>
      </div>

      <div style={{ paddingTop: "32px", paddingLeft: "32px", display: "flex", alignItems: "flex-end", justifyContent: "center", height: "90vh"}}>
        <img
          src="/notebooklogo.png"
          style={{ width: "90px", cursor: "pointer" ,paddingTop: "16px", paddingRight: "16px" }}
          onClick={() => openApp("notebook")}
          alt="Notebook"
        />
          <img
          src="/calculatorlogo.png"
          style={{ width: "120px", cursor: "pointer" ,paddingTop: "16px", paddingRight: "16px" }}
          onClick={() => openApp("calculator")}
          alt="Calculator"
        />
        <img
          src="/browser.png"
          style={{ width: "120px", cursor: "pointer"  ,paddingTop: "16px", paddingRight: "16px" }}
          onClick={() => openApp("browser")}
          alt="Browser"
        />
        <img
          src="/emaillogo.png"
          style={{ width: "120px", cursor: "pointer"  ,paddingTop: "16px", paddingRight: "16px" }}
          onClick={() => openApp("email")}
          alt="Email"
        />
        <img
          src="/messages.png"
          style={{ width: "120px", cursor: "pointer"  ,paddingTop: "16px", paddingRight: "16px" }}
          onClick={() => openApp("messages")}
          alt="Messages"
        />

      </div>
<div style={{
  position: "absolute",
  top: "120px",
  left: "50px",
  width: "500px",     
  height: "325px",
  overflow: "hidden",  
  zIndex: 1,
  border: "2px solid black", 
}}>
  <div style={{ marginTop: "-18px", marginLeft: "-26px", width: "560px" }}>  
    <CalenderContent />
  </div>
</div>

<div style={{
  position: "absolute",
  right: "120px",
  top: "400px",
  width: "500px",
  zIndex: 1,

}} className="flex flex-col place-items-center">
    <h1 className="text-5xl"> Motivational quotes</h1>
  <li className="text-3xl">Its a luxury to be able to fail and get up.</li>
  <li className="text-3xl">We can't become what we need to be by remaining what we are.</li>
  <li className="text-3xl">You don't have to see the whole staircase, just take the first step.</li>

  </div>



      {openWindows.map((openWindow) => {
        const { title, Content } = APP_REGISTRY[openWindow.type];
        return (
          <WindowShell
            key={openWindow.id}
            id={openWindow.id}
            title={title}
            zIndex={openWindow.zIndex}
            onClose={closeWindow}
            onFocus={focusWindow}
          >
            <Content />
          </WindowShell>
        );
      })}
    </main>
  );
}