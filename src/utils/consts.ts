export const StatusList = [
  "planning",
  "started",
  "paused",
  "finished",
  "abondoned",
] as const;

export const statusIconMap: Record<typeof StatusList[number], string> = {
  started: "play_arrow",
  paused: "pause",
  planning: "date_range",
  abondoned: "cancel",
  finished: "check",
};
