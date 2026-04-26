import { useState, useRef } from "react";

interface GameState {
  money: number;
  notes: string;
  timestamp: string;
  purchasedBackgrounds: string[];
  activeBackground: string;
  savedEmailMessages: Record<string, {role: string, content: string}[]>;
  savedEmailGameOver: Record<string, "won" | "lost">;
  unlockedEmailTargets: string[];
  savedSelected: string | null;
  savedChatState: Record<string, { messages: {from: string, text: string}[], currentNode: string }>;
  botDownloaded: boolean;
  scamCount: number;
  campaignVictims: {
    id: string;
    name: string;
    avatar: string;
    snippet: string;
    difficulty: "easy" | "medium" | "hard";
    reward: number;
    systemPrompt: string;
  }[];
  campaignHookEmail: string;
  hasUniversityAccess: boolean;
}

export default function WelcomeContent() {
  const [saveMessage, setSaveMessage] = useState("");
  const [loadMessage, setLoadMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveGame = async () => {
    try {
      const s = await import("@/lib/state");
      const gameState: GameState = {
        money: s.money,
        notes: s.notes,
        timestamp: new Date().toLocaleString(),
        purchasedBackgrounds: s.purchasedBackgrounds,
        activeBackground: s.activeBackground,
        savedEmailMessages: s.savedEmailMessages,
        savedEmailGameOver: s.savedEmailGameOver,
        unlockedEmailTargets: s.unlockedEmailTargets,
        savedSelected: s.savedSelected,
        savedChatState: s.savedChatState,
        botDownloaded: s.botDownloaded,
        scamCount: s.scamCount,
        campaignVictims: s.campaignVictims,
        campaignHookEmail: s.campaignHookEmail,
        hasUniversityAccess: s.hasUniversityAccess,
      };

      const blob = new Blob([JSON.stringify(gameState, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `scamos-save-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSaveMessage("✓ Game saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch {
      setSaveMessage("✗ Error saving game");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const gameState = JSON.parse(await file.text()) as GameState;
      const s = await import("@/lib/state");

      s.setMoney(gameState.money);
      s.setNotes(gameState.notes);
      s.setActiveBackground(gameState.activeBackground);
      s.setSavedSelected(gameState.savedSelected);
      s.setSavedChatState(gameState.savedChatState);
      s.setSavedEmailMessages(gameState.savedEmailMessages);
      s.setSavedEmailGameOver(gameState.savedEmailGameOver);
      gameState.purchasedBackgrounds.forEach(id => s.purchaseBackground(id));
      gameState.unlockedEmailTargets.forEach(t => s.unlockEmailTarget(t));
      if (gameState.botDownloaded) s.setBotDownloaded();
      s.setCampaignVictims(gameState.campaignVictims);
      s.setCampaignHookEmail(gameState.campaignHookEmail);
      if (gameState.hasUniversityAccess) s.setUniversityAccess(true);
      for (let i = 0; i < gameState.scamCount; i++) s.incrementScamCount();

      setLoadMessage("✓ Game loaded! Your progress is restored.");
      setTimeout(() => setLoadMessage(""), 4000);
    } catch {
      setLoadMessage("✗ Error loading save file");
      setTimeout(() => setLoadMessage(""), 3000);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <h1 className="text-5xl font-bold m-8 p-8 text-black">
        Welcome to <strong>Scam the Granny</strong>
      </h1>
      <img className="w-1/2 m-8 p-8" src="/scamlogo3.png" alt="logo" />
      <p className="text-lg mt-4 m-8 p-8 text-black">
        This is a game where it is your goal to scam people out of their hard earned money.
        (Don&apos;t worry they aren&apos;t real, just AI (<s>or are they</s>))
      </p>

      <div className="m-8 p-6 bg-gray-100 rounded-lg border-2 border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-black">Save & Load Progress</h2>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={handleSaveGame}
            className="px-6 py-3 hover:bg-green-600 text-black font-bold rounded-lg transition"
          >
            Save Progress
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 hover:bg-blue-600 text-black font-bold rounded-lg transition"
          >
            Load Progress
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </div>
        {saveMessage && <p className="mt-3 text-sm font-semibold text-green-700">{saveMessage}</p>}
        {loadMessage && <p className="mt-3 text-sm font-semibold text-blue-700">{loadMessage}</p>}
      </div>
    </>
  );
}