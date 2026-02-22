export let notes = "";
export let savedChatState: Record<string, {
  messages: {from: string, text: string}[],
  currentNode: string,
}> = {};
export let savedSelected: string | null = null;

export function setNotes(v: string) { notes = v; }
export function setSavedSelected(v: string | null) { savedSelected = v; }
export function setSavedChatState(v: typeof savedChatState) { savedChatState = v; }
//grascam/app/lib/state.ts