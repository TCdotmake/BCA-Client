import { EXPLORERS } from "../dev/const";

interface PlayerType {
  name: string;
  _id: string;
  status: string;
  explorer: ExplorerType;
  mightLevel: number;
  speedLevel: number;
  sanityLevel: number;
  knowledgeLevel: number;
  turn: number;
}

interface UserData {
  name: string;
  email: string;
}

interface SessionMaker {
  name: string;
  desc: string;
  setName: (value: React.SetStateAction<string>) => void;
  setDesc: (value: React.SetStateAction<string>) => void;
  setSessions: React.Dispatch<React.SetStateAction<SessionType[] | undefined>>;
}
interface SessionType {
  _id: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  owner: string;
  name: string;
  desc: string;
  players: PlayerType[];
}

interface CharSheetType {
  name: string;
  might: number[];
  speed: number[];
  knowledge: number[];
  sanity: number[];
}

interface CharType {
  name: string;
  speedLevel: number;
  mightLevel: number;
  knowledgeLevel: number;
  sanityLevel: number;
}

type ExplorerType = (typeof EXPLORERS)[number];

interface TurnType {
  _id: string;
  turn: number;
}
export type {
  SessionType,
  ExplorerType,
  CharSheetType,
  CharType,
  SessionMaker,
  UserData,
  PlayerType,
  TurnType,
};
