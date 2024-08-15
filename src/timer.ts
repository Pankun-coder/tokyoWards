const MIL_SEC = 1;
const SEC = MIL_SEC * 1000;
const MINUTE = SEC * 60;
const HOUR = MINUTE * 60;

const serializeTime = (from: Date, to: Date) => {
  const diff = to.getTime() - from.getTime();
  const hours = Math.floor(diff / HOUR);
  const minutes = Math.floor((diff - HOUR * hours) / MINUTE);
  const seconds = Math.floor((diff - HOUR * hours - MINUTE * minutes) / SEC);
  const milSec = Math.floor(
    (diff - HOUR * hours - MINUTE * minutes - SEC * seconds) / MIL_SEC
  );
  return [hours, minutes, seconds, milSec]
    .map((time) => String(time).slice(0, 2).padStart(2, "0"))
    .join(":");
};

export default class Timer {
  private from: Date | undefined;
  private to: Date | undefined;
  private intervalId: number | undefined;

  start() {
    this.from = new Date();
    const intervalId = setInterval(() => {
      this.to = new Date();
    }, 10);
    this.intervalId = intervalId;
  }
  stop() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
  getSerializedTime() {
    if (!this.from || !this.to) {
      return serializeTime(new Date(), new Date());
    }
    return serializeTime(this.from, this.to);
  }
}
