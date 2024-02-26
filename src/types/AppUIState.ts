import { ScreenSticker } from "./ScreenSticker";

export interface AppUIState {
  content: string;
  author: string;
  toast: string | null;
  stickers: ScreenSticker[];
}
