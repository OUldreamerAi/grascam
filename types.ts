export type AppType = "welcome" | "notebook" | "calculator" | "browser" | "email" | "messages" | "calender" | "bank";

export interface WindowInstance {
  id: number;
  type: AppType;
  zIndex: number;
}