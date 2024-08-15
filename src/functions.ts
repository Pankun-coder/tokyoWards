import { WardId, wardIdToName } from "./constants";

// States
//状態を持っているのでこのスコープにはあんまりコードを置きたくない
let currentWard: WardId | undefined = undefined;
const done: WardId[] = [];

export const onClickWard = (id: WardId) => {
  if (currentWard) {
    unselectWard(currentWard);
  }
  selectWard(id);
};

export const onFormSubmit = (event: SubmitEvent) => {
  event.preventDefault();
  const inputElement = document.getElementById("input") as
    | HTMLInputElement
    | undefined;
  if (!inputElement) {
    throw new Error("Input not found");
  }
  const userInput = inputElement.value;
  if (currentWard && isMatch(wardIdToName[currentWard], userInput)) {
    inputElement.value = "";
    markAsDone(currentWard);
    console.log("sesikai");
    AlertIfComplete();
    selectRandomWard();
  } else {
    console.log("hazure");
  }
};

const getWard = (id: string) => {
  return document.getElementById(id);
};

const selectWard = (id: WardId) => {
  const element = getWard(id);
  if (!element) {
    throw new Error("ward not found");
  }
  currentWard = id;
  element.style.fill = "red";
};

const unselectWard = (id: WardId) => {
  const element = getWard(id);
  if (!element) {
    throw new Error("ward not found");
  }
  currentWard = undefined;
  element.style.fill = "#EEEEEE";
};

const markAsDone = (id: WardId) => {
  const element = getWard(id);
  if (!element) {
    throw new Error("ward not found");
  }
  currentWard = undefined;
  element.style.fill = "green";
  done.push(id);
};

const isMatch = (wardName: string, input: string) =>
  wardName === input || wardName + "区" === input;

const AlertIfComplete = () => {
  if (done.length === 23) {
    alert("クリア！");
  }
};

const selectRandomWard = () => {
  const wardIds = (
    Object.keys(wardIdToName) as Array<keyof typeof wardIdToName>
  ).filter((id) => !done.includes(id));
  const length = wardIds.length;
  const randomId = wardIds[Math.floor(Math.random() * length)];
  selectWard(randomId);
};
