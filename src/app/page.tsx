import Chat from "@/components/chat";

export default function Home() {
  return (
    <main className="h-screen bg-white p-4 flex flex-col">
      <div className="flex flex-col gap-4 w-full items-center flex-grow max-h-full">
        <h1 className=" text-4xl text-transparent  bg-clip-text bg-gradient-to-r from-violet-800 to-fuchsia-500 font-medium">
          RamadanGuide
        </h1>
        <Chat />
      </div>
    </main>
  );
}
