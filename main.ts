const wardIdToName = {
  adachi: "足立",
  arakawa: "荒川",
  bunkyo: "文京",
  chiyoda: "千代田",
  chuo: "中央",
  edogawa: "江戸川",
  itabashi: "板橋",
  katsushika: "葛飾",
  kita: "北",
  koto: "江東",
  meguro: "目黒",
  minato: "港",
  nakano: "中野",
  nerima: "練馬",
  ota: "大田",
  setagaya: "世田谷",
  shibuya: "渋谷",
  shinagawa: "品川",
  shinjuku: "新宿",
  suginami: "杉並",
  sumida: "墨田",
  taito: "台東",
  toshima: "豊島",
};

type WardId = keyof typeof wardIdToName;
// States
let currentWard: WardId | undefined = undefined;
const done: WardId[] = [];

for (const ward in wardIdToName) {
  const element = document.getElementById(ward);
  if (!element) {
    console.error(ward);
    throw new Error("Ward not found");
  }

  element.addEventListener("click", () => {
    selectWard(ward as WardId);
  });
  // element.addEventListener("blur", () => {
  //   unselectWard(ward as WardId);
  // });
}

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

const buttonElement = document.getElementById("button") as
  | HTMLButtonElement
  | undefined;
if (!buttonElement) {
  throw new Error("Button not founc");
}
buttonElement.addEventListener("click", () => {
  const inputElement = document.getElementById("input") as
    | HTMLInputElement
    | undefined;
  if (!inputElement) {
    throw new Error("Input not found");
  }
  const userInput = inputElement.value;
  console.log("inner text", userInput);
  if (currentWard && isMatch(wardIdToName[currentWard], userInput)) {
    inputElement.value = "";
    markAsDone(currentWard);
    console.log("sesikai");
    AlertIfComplete();
  } else {
    console.log("hazure");
  }
});

const isMatch = (wardName: string, input: string) =>
  wardName === input || wardName + "区" === input;

const AlertIfComplete = () => {
  if (done.length === 23) {
    alert("クリア！");
  }
};

// TODO: 名前の表示はできたらsvgの上がいいけど、難しそうなので別の枠にリストみたいに並べて行ってもいいかも
// TODO: 他の区を選んだ時にハイライト状態を解除する
