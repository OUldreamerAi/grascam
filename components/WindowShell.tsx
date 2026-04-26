"use client";
import { useEffect, useRef, ReactNode, useState } from "react";

interface WindowShellProps {
  id: number;
  title: string;
  zIndex: number;
  onClose: (id: number) => void;
  onFocus: (id: number) => void;
  onFullscreenChange?: (id: number, isFullscreen: boolean) => void;
  initialLeft?: number;
  initialTop?: number;
  children: ReactNode;
}

export default function WindowShell({ id, title, zIndex, onClose, onFocus, onFullscreenChange, initialLeft, initialTop, children }: WindowShellProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const prevFullscreenRef = useRef(false);

  useEffect(() => {
    if (prevFullscreenRef.current !== isFullscreen) {
      prevFullscreenRef.current = isFullscreen;
      onFullscreenChange?.(id, isFullscreen);
    }
  }, [isFullscreen, id, onFullscreenChange]);

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
      if (isFullscreen) return;
      e.preventDefault();
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      document.onmousemove = onDrag;
      document.onmouseup = stopDragging;
    }

    const header = windowElement.querySelector<HTMLElement>(".window-header");
    if (header) header.onmousedown = startDragging;
    return () => { if (header) header.onmousedown = null; };
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      ref={windowRef}
      onMouseDown={() => onFocus(id)}
      style={{
        zIndex,
        position: isFullscreen ? "fixed" : "absolute",
        top: isFullscreen ? 0 : initialTop ?? undefined,
        left: isFullscreen ? 0 : initialLeft ?? undefined,
        width: isFullscreen ? "100vw" : undefined,
        height: isFullscreen ? "100vh" : undefined,
      }}
      className={`border-black border-2 rounded-lg bg-white ${isFullscreen ? "" : "w-1/2"}`}
    >
      <div
        className="window-header flex justify-between items-center px-4 py-2 cursor-move select-none"
        style={{ backgroundColor: "rgba(206, 201, 201, 0.38)" }}
      >
        <p className="text-black">{title}</p>
        <div className="flex gap-2">
          <button
            className="text-black font-bold hover:text-blue-500"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? "⛶" : "□"}
          </button>
          <button
            className="text-black font-bold hover:text-red-500"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => onClose(id)}
          >
            ✕
          </button>
        </div>
      </div>
      <div style={{ 
        overflow: "auto",
        height: isFullscreen ? "calc(100vh - 40px)" : "auto",
        maxHeight: isFullscreen ? undefined : "550px"
      }}>
        {children}
      </div>
    </div>
  );
}