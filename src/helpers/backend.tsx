import { URL } from "../dev/const";

import {
  CharSheetType,
  CharDefaultType,
  SessionMaker,
  SessionType,
} from "../interface/interface";

const getCharSheetAndDefault = (
  setCharSheets: (
    value: React.SetStateAction<CharSheetType[] | undefined>
  ) => void,
  setCharDefaults: (
    value: React.SetStateAction<CharDefaultType[] | undefined>
  ) => void
) => {
  if (
    !localStorage.getItem("charDefaults") ||
    !localStorage.getItem("charSheets")
  ) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("myToken") || "");
    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${URL}/player/charSheets`, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return undefined;
        }
        return res.json();
      })
      .then((result) => {
        if (result) {
          localStorage.setItem("charSheets", JSON.stringify(result.charSheets));
          localStorage.setItem(
            "charDefaults",
            JSON.stringify(result.charDefaults)
          );
        }
      });
  }
  const sheetsStr = localStorage.getItem("charSheets");
  const defaultsStr = localStorage.getItem("charDefaults");
  setCharSheets(JSON.parse(sheetsStr));
  setCharDefaults(JSON.parse(defaultsStr));
};

const refreshSessions = (
  setSessions: (value: React.SetStateAction<SessionType[] | undefined>) => void
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", localStorage.getItem("myToken") || "");
  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch(`${URL}/sessions`, requestOptions)
    .then((res) => {
      if (res.status != 200) {
        return undefined;
      }
      return res.json();
    })
    .then((result) => {
      if (result) {
        setSessions(result);
      }
    });
};

function createSession(sessionMaker: SessionMaker) {
  const data = {
    name: sessionMaker.name || new Date().toDateString(),
    desc: sessionMaker.desc,
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
        sessionMaker.setSessions(result);
        sessionMaker.setName("");
        sessionMaker.setDesc("");
      }
    });
}

function getSession(
  sessionID: string | undefined,
  setter: React.Dispatch<React.SetStateAction<SessionType | undefined>>
) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("myToken") || "");
  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch(`${URL}/sessions/${sessionID}`, requestOptions)
    .then((res) => {
      if (res.status != 200) {
        return undefined;
      }
      return res.json();
    })
    .then((result) => {
      if (result) {
        setter(result);
      }
    });
}

export { getCharSheetAndDefault, refreshSessions, createSession, getSession };
