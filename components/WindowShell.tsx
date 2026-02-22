"use client";
import { useEffect, useRef, ReactNode } from "react";

interface WindowShellProps {
  id: number;
  title: string;
  zIndex: number;
  onClose: (id: number) => void;
  onFocus: (id: number) => void;
  children: ReactNode;
}

export default function WindowShell({ id, title, zIndex, onClose, onFocus, children }: WindowShellProps) {
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
    return () => { if (header) header.onmousedown = null; };
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