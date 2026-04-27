
//state.ts
export let notes = "";
export let money = 16;
export let savedChatState: Record<string, { messages: {from: string, text: string}[], currentNode: string }> = {};
export let savedSelected: string | null = null;
export let unlockedEmailTargets: string[] = [];
export let purchasedBackgrounds: string[] = [];
export let activeBackground = "/desktopbackground.png";
export let savedEmailMessages: Record<string, {role: string, content: string}[]> = {};
export let savedEmailGameOver: Record<string, "won" | "lost"> = {};


export let botDownloaded = false;
export let scamCount = 0;
export let campaignVictims: {
  id: string;
  name: string;
  avatar: string;
  snippet: string;
  difficulty: "easy" | "medium" | "hard";
  reward: number;
  systemPrompt: string;
}[] = [];
export let campaignHookEmail = "";


export let hasUniversityAccess = false;

export function setNotes(v: string) { notes = v; }
export function setMoney(v: number) { money = v; }
export function setSavedSelected(v: string | null) { savedSelected = v; }
export function setSavedChatState(v: typeof savedChatState) { savedChatState = v; }
export function unlockEmailTarget(name: string) {
  if (!unlockedEmailTargets.includes(name)) unlockedEmailTargets.push(name);
}
export function purchaseBackground(bg: string) {
  if (!purchasedBackgrounds.includes(bg)) purchasedBackgrounds.push(bg);
}
export const bgCallbacks = { onChange: null as ((bg: string) => void) | null };
export function setSavedEmailMessages(v: typeof savedEmailMessages) { savedEmailMessages = v; }
export function setSavedEmailGameOver(v: typeof savedEmailGameOver) { savedEmailGameOver = v; }
export function setBotDownloaded() { botDownloaded = true; }
export function incrementScamCount() { scamCount++; }
export function setCampaignVictims(v: typeof campaignVictims) { campaignVictims = v; }
export function setCampaignHookEmail(v: string) { campaignHookEmail = v; }
export function setUniversityAccess(v: boolean) { hasUniversityAccess = v; }

export function setActiveBackground(bg: string) {
  activeBackground = bg;
  bgCallbacks.onChange?.(bg);   
}

export function getCurrentTier(): 1 | 2 | 3 {
  if (scamCount >= 6) return 3;
  if (scamCount >= 3) return 2;
  return 1;
}