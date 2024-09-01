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

type ExplorerType = (typeof EXPLORERS)[number];

export type { SessionType, ExplorerType };
