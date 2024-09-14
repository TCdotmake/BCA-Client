import { useEffect, useState } from "react";
import { CharSheetType, CharType } from "../interface/interface";

interface StatProp {
  type: string;
  values: number[];
  level: number;
}
function StatDisplay(StatProp: StatProp) {
  return (
    <>
      <li>
        <h4>{`${StatProp.type}: `}</h4>
        <ul className="flex flex-row justify-between">
          {StatProp.values.length &&
            StatProp.values.map((value, index) => {
              if (index === StatProp.level) {
                return (
                  <li
                    key={`${StatProp.type}-level-${index}-value`}
                    className="text-rose-500"
                  >
                    {value}
                  </li>
                );
              }
              return (
                <li key={`${StatProp.type}-level-${index}-value`}>{value}</li>
              );
            })}
        </ul>
      </li>
    </>
  );
}

const ATTRIBUTE_TYPE = ["might", "speed", "knowledge", "sanity"];

interface Prop {
  char: CharType;
}
export default function CharCard(prop: Prop) {
  const charSheets = JSON.parse(localStorage.getItem("charSheets"));
  const [charSheet, setCharSheet] = useState<CharSheetType>();
  useEffect(() => {
    charSheets.length &&
      charSheets.map((n) => {
        if (n.name === prop.char.name) {
          setCharSheet(n);
        }
      });
  }, [prop.char]);

  return (
    <>
      {charSheet && (
        <div>
          <h3>{prop.char.name}</h3>
          <ul>
            {ATTRIBUTE_TYPE.map((type) => {
              return (
                <StatDisplay
                  key={`${type}-stat-display`}
                  type={type}
                  values={charSheet[`${type}`]}
                  level={prop.char[`${type}Level`]}
                />
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
