export let notes = "";
export let savedChatState: Record<string, {
  messages: {from: string, text: string}[],
  currentNode: string,
}> = {};
export let savedSelected: string | null = null;
export let money = 0

export function setNotes(v: string) { notes = v; }
export function setSavedSelected(v: string | null) { savedSelected = v; }
export function setSavedChatState(v: typeof savedChatState) { savedChatState = v; }
export function setMoney(){}
//grascam/app/lib/state.ts