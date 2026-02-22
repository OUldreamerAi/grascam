"use client";
import { useState, useEffect } from "react";
import { AppType, WindowInstance } from "@/types";
import WindowShell from "@/components/WindowShell";
import WelcomeContent from "@/apps/WelcomeContent";
import NotebookContent from "@/apps/NotebookContent";
import CalculatorContent from "@/apps/CalculatorContent";
import BrowserContent from "@/apps/BrowserContent";
import EmailContent from "@/apps/EmailContent";
import MessagesContent from "@/apps/MessagesContent";
import CalenderContent from "@/components/CalenderContent";
import BankContent from "@/apps/BankContent";

let nextWindowId = 0;
let highestZIndex = 1;

const APP_REGISTRY: Record<AppType, { title: string; Content: () => React.ReactNode }> = {
  welcome:    { title: "Welcome",    Content: WelcomeContent },
  notebook:   { title: "Notebook",   Content: NotebookContent },
  calculator: { title: "Calculator", Content: CalculatorContent },
  browser:    { title: "Browser",    Content: BrowserContent },
  email:      { title: "Email",      Content: EmailContent },
  messages:   { title: "Messages",   Content: MessagesContent },
  calender:   { title: "Calender",   Content: CalenderContent },
  bank:       { title: "Bank",       Content: BankContent },
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
    setOpenWindows((prev) => [...prev, {
      id: nextWindowId++,
      type,
      zIndex: ++highestZIndex,
    }]);
  }

  function closeWindow(id: number) {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
  }

  function focusWindow(id: number) {
    setOpenWindows((prev) => prev.map((w) =>
      w.id === id ? { ...w, zIndex: ++highestZIndex } : w
    ));
  }

  return (
    <main className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/desktopbackground.png')" }}>

      <div className="flex justify-between relative z-[9999] text-black pointer-events-none items-center"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.48)" }}>
        <button className="m-2 text-5xl pointer-events-auto" onClick={() => openApp("welcome")}>
          ScamOS
        </button>
        <p className="m-2 text-3xl">{currentTime}</p>
      </div>

      <div style={{ paddingTop: "32px", paddingLeft: "32px", display: "flex", alignItems: "flex-end", justifyContent: "center", height: "90vh" }}>
        <img src="/notebooklogo.png" style={{ width: "90px",  cursor: "pointer", paddingTop: "16px", paddingRight: "16px" }} onClick={() => openApp("notebook")}   alt="Notebook" />
        <img src="/calculatorlogo.png" style={{ width: "120px", cursor: "pointer", paddingTop: "16px", paddingRight: "16px" }} onClick={() => openApp("calculator")} alt="Calculator" />
        <img src="/browser.png" style={{ width: "120px", cursor: "pointer", paddingTop: "16px", paddingRight: "16px" }} onClick={() => openApp("browser")}    alt="Browser" />
        <img src="/emaillogo.png" style={{ width: "120px", cursor: "pointer", paddingTop: "16px", paddingRight: "16px" }} onClick={() => openApp("email")}      alt="Email" />
        <img src="/messages.png" style={{ width: "120px", cursor: "pointer", paddingTop: "16px", paddingRight: "16px" }} onClick={() => openApp("messages")}   alt="Messages" />
        <img src="/bank.png" style={{ width: "120px", height: "100px", objectFit: "cover", objectPosition: "0% 30%",cursor: "pointer", paddingTop: "16px", paddingRight: "16px" }} onClick={() => openApp("bank")}   alt="Bank" />
      </div>

      <div style={{ position: "absolute", top: "120px", left: "50px", width: "500px", height: "325px", overflow: "hidden", zIndex: 1, border: "2px solid black" }}>
        <div style={{ marginTop: "-18px", marginLeft: "-26px", width: "560px" }}>
          <CalenderContent />
        </div>
      </div>

      <div style={{ position: "absolute", right: "120px", top: "400px", width: "500px", zIndex: 1 }}
        className="flex flex-col place-items-center">
        <h1 className="text-5xl">Motivational quotes</h1>
        <li className="text-3xl">Its a luxury to be able to fail and get up.</li>
        <li className="text-3xl">We can't become what we need to be by remaining what we are.</li>
        <li className="text-3xl">You don't have to see the whole staircase, just take the first step.</li>
      </div>


      {openWindows.map((openWindow) => {
        const { title, Content } = APP_REGISTRY[openWindow.type];
        return (
          <WindowShell key={openWindow.id} id={openWindow.id} title={title}
            zIndex={openWindow.zIndex} onClose={closeWindow} onFocus={focusWindow}>
            <Content />
          </WindowShell>
        );
      })}
    </main>
  );
}