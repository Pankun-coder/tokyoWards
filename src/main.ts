import { WardId, wardIdToName } from "./constants";

import { onFormSubmit, onClickWard } from "./functions";

for (const ward in wardIdToName) {
  const element = document.getElementById(ward);
  if (!element) {
    console.error(ward);
    throw new Error("Ward not found");
  }
  element.addEventListener("click", () => onClickWard(ward as WardId));
}

const form = document.getElementById("form") as HTMLFormElement | undefined;
if (!form) {
  throw new Error("no form");
}
form.addEventListener("submit", onFormSubmit);

// TODO: 名前の表示はできたらsvgの上がいいけど、難しそうなので別の枠にリストみたいに並べて行ってもいいかも
