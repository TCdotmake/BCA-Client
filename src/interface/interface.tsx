interface SessionType {
  _id: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  owner: string;
  name: string;
  desc: string;
}

export default SessionType;
