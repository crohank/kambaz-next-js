import { ReactNode } from "react";
export default function Highlight({ children }: { children: ReactNode }) {
  return (
    <mark 
      id="wd-highlight" 
      style={{ 
        backgroundColor: "yellow", 
        color: "red",
        display: "inline",
        whiteSpace: "normal",
        wordBreak: "break-word"
      }}
    >
      {children}
    </mark>
  );
}