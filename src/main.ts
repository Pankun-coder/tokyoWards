import { WardId, wardIdToName } from "./constants";

import Game from "./game";
import Timer from "./timer";

const game = new Game();
const timer = new Timer();

let currentWard: undefined | WardId;

timer.start();

const getWard = (id: WardId) => {
  const res = document.getElementById(id);
  if (!res) {
    throw new Error("ward not found");
  }
  return res;
};

const selectWard = (id: WardId) => {
  const element = getWard(id);
  currentWard = id;
  element.style.fill = "red";
};

const unselectWard = (id: WardId) => {
  const previous = getWard(id);
  currentWard = undefined;
  previous.style.fill = "#EEEEEE";
};

for (const ward in wardIdToName) {
  const element = getWard(ward as WardId);
  element.addEventListener("click", () => {
    if (currentWard) {
      unselectWard(currentWard);
    }
    selectWard(ward as WardId);
  });
}

const form = document.getElementById("form") as HTMLFormElement | undefined;
if (!form) {
  throw new Error("no form");
}
const inputElement = document.getElementById("input") as
  | HTMLInputElement
  | undefined;
if (!inputElement) {
  throw new Error("Input not found");
}

form.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();

  const userInput = inputElement.value;
  if (currentWard && game.isCorrectName(currentWard, userInput)) {
    game.markAsDone(currentWard);
    inputElement.value = "";
    const element = getWard(currentWard);
    element.style.fill = "green";
    currentWard = undefined;
    console.log("sesikai");
    if (game.hasCompleted()) {
      alert("clear!");
      timer.stop();
      return;
    }
    const newWardId = game.getNotDoneWardRandomly();
    selectWard(newWardId);
  } else {
    console.log("hazure");
  }
});

const timerDisplay = document.getElementById("timer-display");
if (!timerDisplay) {
  throw new Error("timer not found");
}

setInterval(() => {
  timerDisplay.innerText = timer.getSerializedTime();
}, 10);

// TODO: 名前の表示はできたらsvgの上がいいけど、難しそうなので別の枠にリストみたいに並べて行ってもいいかも
