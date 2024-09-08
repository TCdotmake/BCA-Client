import { useState } from "react";
import { SessionType } from "../interface/interface";
import { createSession } from "../helpers/backend";
interface Prop {
  setSessions: React.Dispatch<React.SetStateAction<SessionType[] | undefined>>;
}

export default function CreateSession(prop: Prop) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const setSessions = prop.setSessions;
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createSession({ name, setName, desc, setDesc, setSessions });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputSessionName">Session Name</label>
        <input
          type="text"
          onChange={handleName}
          id="inputSessionName"
          value={name}
        />
        <label htmlFor="inputSessionDesc">Description</label>
        <input
          type="text"
          onChange={handleDesc}
          id="inputSessionDesc"
          value={desc}
        />
        <input type="submit" value="Create Session" />
      </form>
    </>
  );
}
