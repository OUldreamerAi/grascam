
//page.tsx
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { AppType } from "@/types";
import WindowShell from "@/components/WindowShell";
import WelcomeContent from "@/apps/WelcomeContent";
import NotebookContent from "@/apps/NotebookContent";
import CalculatorContent from "@/apps/CalculatorContent";
import BrowserContent from "@/apps/BrowserContent";
import EmailContent from "@/apps/EmailContent";
import MessagesContent from "@/apps/MessagesContent";
import CalenderContent from "@/components/CalenderContent";
import BankContent from "@/apps/BankContent";
import {
  activeBackground as initialBg,
  bgCallbacks,           
  purchasedBackgrounds,
  setActiveBackground,
} from "@/lib/state";
 
const BG_FILES: Record<string, string> = {
  bg1: "/bgimage2.png",
  bg2: "/bgimage.png",
  bg3: "/bgimage3.png",
  bg4: "/bgimage5.png",   
  bg5: "/bgimage4.png", 
};

const BG_NAMES: Record<string, string> = {
  bg1: "Black but it has red",
  bg2: "Black",
  bg3: "Sunny forest vibes",
  bg4: "Mountains",      
  bg5: "The sun", 
};
 
interface WindowInstance {
  id: number;
  type: AppType;
  zIndex: number;
  initialLeft: number;
  initialTop: number;
}

 
export default function Home() {
  const nextWindowIdRef = useRef(0);
  const highestZIndexRef = useRef(1);
 
  const [currentTime, setCurrentTime] = useState("");
  const [openWindows, setOpenWindows] = useState<WindowInstance[]>([]);
  const [showSplash, setShowSplash] = useState(true);
  const [fullscreenWindowIds, setFullscreenWindowIds] = useState<Set<number>>(new Set());
 
  const [bg, setBg] = useState(initialBg);
  const [pickerOpen, setPickerOpen] = useState(false);

  const bgIsDark = bg !== "/bgimage4.png" && bg !== "/bgimage3.png"
  const quoteColor = bgIsDark ? "white" : "black";
 
useEffect(() => {
  bgCallbacks.onChange = setBg;
  return () => { bgCallbacks.onChange = null; };
}, []);
 
  const APP_REGISTRY: Record<AppType, { title: string; Content: (props?: any) => React.ReactNode }> = {
    welcome:    { title: "Welcome",    Content: WelcomeContent },
    notebook:   { title: "Notebook",   Content: NotebookContent },
    calculator: { title: "Calculator", Content: CalculatorContent },
    browser:    { title: "Browser",    Content: BrowserContent },
    email:      { title: "Email",      Content: EmailContent },
    messages:   { title: "Messages",   Content: MessagesContent },
    calender:   { title: "Calender",   Content: CalenderContent },
    bank:       { title: "Bank",       Content: BankContent },
  };
 
  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
 
  const handleWindowFullscreenChange = useCallback((id: number, isFullscreen: boolean) => {
    setFullscreenWindowIds((prev) => {
      const next = new Set(prev);
      isFullscreen ? next.add(id) : next.delete(id);
      return next;
    });
  }, []);
 
  function handleSplashClick() {
    setShowSplash(false);
    document.documentElement.requestFullscreen?.().catch(() => {});
  }
 
  function openApp(type: AppType) {
    const windowWidth = window.innerWidth * 0.5;
    const windowHeight = 550;
    const left = (window.innerWidth - windowWidth) / 2;
    const top = (window.innerHeight - windowHeight) / 2;
    setOpenWindows((prev) => [...prev, {
      id: nextWindowIdRef.current++,
      type,
      zIndex: ++highestZIndexRef.current,
      initialLeft: left,
      initialTop: top,
    }]);
  }
 
  function closeWindow(id: number) {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    setFullscreenWindowIds((prev) => { const s = new Set(prev); s.delete(id); return s; });
  }
 
  function focusWindow(id: number) {
    setOpenWindows((prev) => prev.map((w) =>
      w.id === id ? { ...w, zIndex: ++highestZIndexRef.current } : w
    ));
  }
 
  const ownedBgs = [
    { id: "default", file: "/desktopbackground.png", name: "Default" },
    ...purchasedBackgrounds.map(id => ({ id, file: BG_FILES[id], name: BG_NAMES[id] ?? id })),
  ];
 
  if (showSplash) {
    return (
      <div
        onClick={handleSplashClick}
        style={{
          width: "100vw", height: "100vh",
          backgroundImage: `url('${bg}')`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "white", userSelect: "none",
        }}
      >
        <h1 style={{ fontSize: "6rem", marginBottom: "1rem" }}>Welcome to</h1>
        <img className="w-1/2 m-8 p-8" src="/scamlogo3.png" alt="logo" />
        <p className="text-white text-2xl">Click anywhere to start</p>
      </div>
    );
  }
 
  return (
    <main
      className="h-screen w-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${bg}')` }}  
    >
      {fullscreenWindowIds.size === 0 && (
        <div
          className="flex justify-between relative z-[9999] text-black pointer-events-none items-center"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.48)" }}
        >
          <button className="m-2 text-5xl pointer-events-auto" onClick={() => openApp("welcome")}>
            ScamOS
          </button>
          <p className="m-2 text-3xl">{currentTime}</p>
        </div>
      )}
 
      <div style={{
        paddingTop: "32px", paddingLeft: "32px",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        height: fullscreenWindowIds.size > 0 ? "100vh" : "calc(100vh - 80px)",
      }}>
        <img src="/notebooklogo.png"   style={{ width: "90px",  cursor: "pointer", paddingTop: "16px", paddingRight: "16px" }} onClick={() => openApp("notebook")}   alt="Notebook" />
        <img src="/calculatorlogo.png" style={{ width: "120px", cursor: "pointer", paddingTop: "16px", paddingRight: "16px" }} onClick={() => openApp("calculator")} alt="Calculator" />
        <img src="/browser.png"        style={{ width: "120px", cursor: "pointer", paddingTop: "16px", paddingRight: "16px" }} onClick={() => openApp("browser")}    alt="Browser" />
        <img src="/emaillogo.png"      style={{ width: "120px", cursor: "pointer", paddingTop: "16px", paddingRight: "16px" }} onClick={() => openApp("email")}      alt="Email" />
        <img src="/messages.png"       style={{ width: "120px", cursor: "pointer", paddingTop: "16px", paddingRight: "16px" }} onClick={() => openApp("messages")}   alt="Messages" />
        <img src="/bank.png"           style={{ width: "120px", height: "100px", objectFit: "cover", objectPosition: "0% 30%", cursor: "pointer", paddingTop: "16px", paddingRight: "16px" }} onClick={() => openApp("bank")} alt="Bank" />
      </div>
 
      {fullscreenWindowIds.size === 0 && (
        <>
          <div style={{ position: "absolute", top: "120px", left: "50px", width: "500px", height: "325px", overflow: "hidden", zIndex: 1, border: "2px solid black" }}>
            <div style={{ marginTop: "-18px", marginLeft: "-26px", width: "560px" }}>
              <CalenderContent />
            </div>
          </div>
 
<div style={{ position: "absolute", right: "120px", top: "400px", width: "500px", zIndex: 1, color: quoteColor }}
  className="flex flex-col place-items-center">
  <h1 className="text-5xl">Motivational quotes</h1>
  <li className="text-3xl">Its a luxury to be able to fail and get up.</li>
  <li className="text-3xl">We can&apos;t become what we need to be by remaining what we are.</li>
  <li className="text-3xl">You don&apos;t have to see the whole staircase, just take the first step.</li>
</div>
 
          {ownedBgs.length > 1 && (
            <div style={{ position: "absolute", bottom: "-30px", right: "-150px", zIndex: 9998 }}>
              {pickerOpen && (
                <div style={{
                  position: "absolute", bottom: "70px", right: 330,
                  background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
                  border: "1px solid rgba(0,0,0,0.15)", borderRadius: "12px",
                  padding: "8px", display: "flex", flexDirection: "column", gap: "6px",
                  minWidth: "160px", boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                }}>
                  <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#666", padding: "2px 6px 4px" }}>Wallpaper</p>
                  {ownedBgs.map(item => (
                    <button
                      key={item.id}
                      onClick={() => { setActiveBackground(item.file); setPickerOpen(false); }}
                      style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        padding: "6px 10px", borderRadius: "8px", border: "none",
                        background: bg === item.file ? "rgba(0,0,0,0.08)" : "transparent",
                        cursor: "pointer", textAlign: "left", width: "100%",
                      }}
                    >
                      <div style={{
                        width: "32px", height: "20px", borderRadius: "4px",
                        backgroundImage: `url('${item.file}')`,
                        backgroundSize: "cover", backgroundPosition: "center",
                        border: bg === item.file ? "2px solid #333" : "1px solid rgba(0,0,0,0.2)",
                        flexShrink: 0,
                      }} />
                      <span style={{ fontSize: "12px", color: "#333", fontWeight: bg === item.file ? 600 : 400 }}>
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={() => setPickerOpen(o => !o)}
                title="Change wallpaper"
                
              >
                <img src="/bg.png" alt="Change wallpaper" style={{ width: "320px", height: "160px" }} />
              </button>
            </div>
          )}
        </>
      )}
 
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
            onFullscreenChange={handleWindowFullscreenChange}
            initialLeft={openWindow.initialLeft}
            initialTop={openWindow.initialTop}
          >
            <Content />
          </WindowShell>
        );
      })}
    </main>
  );
}