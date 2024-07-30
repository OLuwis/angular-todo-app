export interface Item {
  id: string;
  description: string;
  done: boolean;
}

export type Filter = "all" | "done" | "pending"