import { useState, useRef } from "react";

interface GameState {
  // Basic
  money: number;
  notes: string;
  timestamp: string;
  
  // Backgrounds
  purchasedBackgrounds: string[];
  activeBackground: string;
  
  // Email system
  savedEmailMessages: Record<string, {role: string, content: string}[]>;
  savedEmailGameOver: Record<string, "won" | "lost">;
  unlockedEmailTargets: string[];
  savedSelected: string | null;
  
  // Chat/Message trees
  savedChatState: Record<string, { messages: {from: string, text: string}[], currentNode: string }>;
  
  // Bot & Campaign
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
}

export default function WelcomeContent() {
  const [saveMessage, setSaveMessage] = useState("");
  const [loadMessage, setLoadMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveGame = async () => {
    try {
      // Import all state from the state module
      const stateModule = await import("@/lib/state");
      
      const gameState: GameState = {
        // Basic
        money: stateModule.money,
        notes: stateModule.notes,
        timestamp: new Date().toLocaleString(),
        
        // Backgrounds
        purchasedBackgrounds: stateModule.purchasedBackgrounds,
        activeBackground: stateModule.activeBackground,
        
        // Email system
        savedEmailMessages: stateModule.savedEmailMessages,
        savedEmailGameOver: stateModule.savedEmailGameOver,
        unlockedEmailTargets: stateModule.unlockedEmailTargets,
        savedSelected: stateModule.savedSelected,
        
        // Chat/Message trees
        savedChatState: stateModule.savedChatState,
        
        // Bot & Campaign
        botDownloaded: stateModule.botDownloaded,
        scamCount: stateModule.scamCount,
        campaignVictims: stateModule.campaignVictims,
        campaignHookEmail: stateModule.campaignHookEmail,
      };

      const dataStr = JSON.stringify(gameState, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `scamos-save-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSaveMessage("✓ Game saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("✗ Error saving game");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  const handleLoadGame = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const gameState = JSON.parse(text) as GameState;

      // Import state module
      const stateModule = await import("@/lib/state");
      
      // Load all game state
      stateModule.setMoney(gameState.money);
      stateModule.setNotes(gameState.notes);
      stateModule.setActiveBackground(gameState.activeBackground);
      stateModule.setSavedSelected(gameState.savedSelected);
      stateModule.setSavedChatState(gameState.savedChatState);
      stateModule.setSavedEmailMessages(gameState.savedEmailMessages);
      stateModule.setSavedEmailGameOver(gameState.savedEmailGameOver);
      
      // Restore background purchases
      gameState.purchasedBackgrounds.forEach(bgId => {
        stateModule.purchaseBackground(bgId);
      });
      
      // Restore email targets
      gameState.unlockedEmailTargets.forEach(target => {
        stateModule.unlockEmailTarget(target);
      });
      
      // Restore bot and campaign state
      if (gameState.botDownloaded) {
        stateModule.setBotDownloaded();
      }
      
      // Restore campaign victims
      stateModule.setCampaignVictims(gameState.campaignVictims);
      stateModule.setCampaignHookEmail(gameState.campaignHookEmail);
      
      // Restore scam count by incrementing
      for (let i = 0; i < gameState.scamCount; i++) {
        stateModule.incrementScamCount();
      }

      setLoadMessage("✓ Game loaded successfully! Your progress is restored.");
      setTimeout(() => setLoadMessage(""), 4000);
    } catch (error) {
      setLoadMessage("✗ Error loading save file");
      setTimeout(() => setLoadMessage(""), 3000);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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

      <div className="m-8 p-6 bg-gray-100 rounded-lg border-2 border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-black">Save & Load Progress</h2>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={handleSaveGame}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition"
          >
            Save Progress
          </button>
          <button
            onClick={handleLoadGame}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition"
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

        {saveMessage && (
          <p className="mt-3 text-sm font-semibold text-green-700">{saveMessage}</p>
        )}
        {loadMessage && (
          <p className="mt-3 text-sm font-semibold text-blue-700">{loadMessage}</p>
        )}
      </div>
    </>
  );
}