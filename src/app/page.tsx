"use client";
import Chat from "@/components/chat";
import WarningPopup from "@/components/warningPopup";
import { useEffect, useState } from "react";

export default function Home() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    setShowWarning(true);
  }, []);

  return (
    <main className="h-screen bg-white p-2 sm:p-4 flex flex-col">
      <div className="flex flex-col gap-2 sm:gap-4 w-full items-center flex-grow max-h-full">
        <h1 className=" text-4xl text-transparent  bg-clip-text bg-gradient-to-r from-violet-800 to-fuchsia-500 font-medium">
          RamadanGuide
        </h1>
        <Chat />
      </div>
      <WarningPopup
        isVisible={showWarning}
        onClose={() => setShowWarning(false)}
      />
    </main>
  );
}
