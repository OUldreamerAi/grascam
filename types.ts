export type AppType = "welcome" | "notebook" | "calculator" | "browser" | "email" | "messages" | "calender" | "bank" | "ending";

export interface WindowInstance {
  id: number;
  type: AppType;
  zIndex: number;
}