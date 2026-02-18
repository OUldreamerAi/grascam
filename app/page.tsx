"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");
  const windowRef = useRef<HTMLDivElement>(null);
  var welcomeScreen = document.querySelector("#welcome")


  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
    const interval = setInterval(() => setCurrentTime(new Date().toLocaleString()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {

    function dragElement(element: HTMLElement) {
      var initialX = 0, initialY = 0, currentX = 0, currentY = 0;

      if (document.getElementById(element.id + "header")) {
        document.getElementById(element.id + "header")!.onmousedown = startDragging;
      } else {
        element.onmousedown = startDragging;
      }

      function startDragging(e: MouseEvent) {
        e = e || window.event as MouseEvent;
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = onDrag;
      }

      function onDrag(e: MouseEvent) {
        e = e || window.event as MouseEvent;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
      }

      function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
    if (windowRef.current) dragElement(windowRef.current);
  }, []);

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/desktopbackground.png')" }}>

      <div className="flex justify-between" style={{ backgroundColor: "rgba(206, 201, 201, 0.38)" }}>
        <p className="m-4">ScamOS</p>
        <p className="m-4">{currentTime}</p>
      </div>

      <div
        ref={windowRef}
        id="welcome"
        className="border-black border-2 w-1/2 rounded-lg absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-white cursor-grab">
        
        <p id="windowheader" ref={windowRef} className="flex justify-between" style={{ backgroundColor: "rgba(206, 201, 201, 0.38)" }}>
          header
        </p>
        <h1 className="text-5xl font-bold m-8 p-8 text-black ">
          Welcome to <strong>Scam the Granny</strong>
        </h1>
        <img className="w-1/2 m-8 p-8" src="/scamlogo3.png" />
        <p className="text-lg mt-4 m-8 p-8 text-black">
          This is a game where it is your goal to scam people out of their hard
          earned money. (Dont worry they arent real just Ai (<s>or are they</s>))
        </p>
      </div>
    </main>
  );
}