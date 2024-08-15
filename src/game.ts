import { WardId, wardIdToName } from "./constants";

const isMatch = (wardName: string, input: string) => {
  return wardName === input || wardName + "区" === input;
};

export default class Game {
  private done: WardId[];
  constructor() {
    this.done = [];
  }
  markAsDone(id: WardId) {
    this.done.push(id);
  }
  isCorrectName(id: WardId, name: string) {
    return isMatch(wardIdToName[id], name);
  }
  hasCompleted() {
    return this.done.length === 23;
  }
  getNotDoneWardRandomly() {
    const wardIds = (
      Object.keys(wardIdToName) as Array<keyof typeof wardIdToName>
    ).filter((id) => !this.done.includes(id));
    const length = wardIds.length;
    const randomId = wardIds[Math.floor(Math.random() * length)];
    return randomId;
  }
}
