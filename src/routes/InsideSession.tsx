import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../dev/const";
import {
  SessionType,
  CharSheetType,
  CharDefaultType,
} from "../interface/interface";
import { EXPLORERS } from "../dev/const";
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

interface Info {
  label: string;
  info: string | undefined;
}
function LabeledPair(prop: Info) {
  return (
    <>
      <div className="flex flex-row justify-between w-72">
        <p>{prop.label}</p>
        <p>{prop.info}</p>
      </div>
    </>
  );
}

function convertDate(date) {
  return new Date(date).toLocaleDateString("en-us", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface Prop {
  sessionID: string;
}

function AddPlayer(prop: Prop) {
  const [playerName, setPlayerName] = useState<string>("");
  const [explorer, setExplorer] = useState<string>("");
  const [charSheets, setCharSheets] = useState<CharSheetType[]>();
  const [charDefaults, setCharDefaults] = useState<CharDefaultType[]>();
  useEffect(() => {
    if (
      !localStorage.getItem("charDefaults") ||
      !localStorage.getItem("charSheets")
    ) {
      console.log("calling fetch");
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
            localStorage.setItem(
              "charSheets",
              JSON.stringify(result.charSheets)
            );
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
  }, []);

  useEffect(() => {
    const addPlayer: HTMLElement | null =
      document.getElementById("submitAddPlayer");
    if (playerName !== "" && explorer !== "") {
      addPlayer?.removeAttribute("disabled");
    } else {
      addPlayer?.setAttribute("disabled", "true");
    }
  }, [playerName, explorer]);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };

  const handleChangeExplorer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExplorer(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("myToken") || "");
    const raw = JSON.stringify({
      playerName: playerName,
      explorer: explorer,
      sessionID: prop.sessionID,
    });
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${URL}/player`, requestOptions)
      .then((res) => {
        if (res.status !== 201) {
          return undefined;
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="PlayerNameInput">Player Name</label>
      <input
        type="text"
        id="PlayerNameInput"
        value={playerName}
        onChange={handleChangeName}
      />
      <label htmlFor="selectExplorer">Explorer</label>
      <select
        id="selectExplorer"
        value={explorer}
        onChange={handleChangeExplorer}
      >
        <option value=""></option>
        {EXPLORERS.map((explorer) => {
          return (
            <option value={explorer} key={`${explorer}-option`}>
              {explorer}
            </option>
          );
        })}
      </select>
      <input type="submit" value="Add Player" id="submitAddPlayer" disabled />
    </form>
  );
}

export default function InsideSession() {
  const [session, setSession] = useState<SessionType>();
  const [created, setCreated] = useState<string>("");
  const [updated, setUpdated] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { sessionID } = useParams();
  useEffect(() => {
    getSession(sessionID, setSession);
  }, []);

  useEffect(() => {
    setCreated(convertDate(session?.createdAt));
    setUpdated(convertDate(session?.updatedAt));
  }, [session]);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <LabeledPair label="Session Name: " info={session?.name} />
      <LabeledPair label="Description: " info={session?.desc} />
      <LabeledPair label="Created: " info={created} />
      <LabeledPair label="Last Update: " info={updated} />
      <LabeledPair
        label="Game in Progress: "
        info={session?.active ? "Yes" : "No"}
      />
      <button onClick={toggleModal}>Add Player</button>
      {openModal && <AddPlayer sessionID={session?._id} />}
    </>
  );
}
