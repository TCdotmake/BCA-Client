import { useState } from "react";
import { SessionType } from "../interface/interface";
import { URL } from "../dev/const";

interface Prop {
  setSessions: React.Dispatch<React.SetStateAction<SessionType[] | undefined>>;
}

export default function CreateSession(prop: Prop) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  interface SessionMaker {
    name: string;
    desc: string;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: SessionMaker = {
      name: name || new Date().toDateString(),
      desc,
    };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("myToken") || "");
    const raw = JSON.stringify(data);
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${URL}/sessions`, requestOptions)
      .then((res) => {
        if (res.status != 201) {
          return undefined;
        }
        return res.json();
      })
      .then((result) => {
        if (result) {
          prop.setSessions(result);
          setName("");
          setDesc("");
        }
      });
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
