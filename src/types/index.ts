import type { StatusList } from "@/utils/consts";

export type Writable<T> = { -readonly [K in keyof T]: T[K] };
export type StatusType = typeof StatusList[number];

export interface HobbyCategory {
  id: string;
  hobbyType: string;
  name: string;
}

export interface Hobby {
  id?: string;
  category: string;
  name: string;
  startDate: Date;
  status: StatusType;
}

export interface HobbyStatusLog {
  id?: string;
  hobbyId: string;
  status: string;
}
