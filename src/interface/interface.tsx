import { EXPLORERS } from "../dev/const";
interface SessionType {
  _id: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  owner: string;
  name: string;
  desc: string;
}

interface CharSheetType {
  name: string;
  might: number[];
  speed: number[];
  knowledge: number[];
  sanity: number[];
}

interface CharDefaultType {
  name: string;

  speedLevel: number;
  mightLevel: number;

  knowledgeLevel: number;
  sanityLevel: number;
}

type ExplorerType = (typeof EXPLORERS)[number];

export type { SessionType, ExplorerType, CharSheetType, CharDefaultType };
