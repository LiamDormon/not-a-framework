export default {
  handler: async ([hh, mm]: [number, number]) => {
    emitNet("not-a-framework:setTime", hh, mm)
  },
  name: "settime",
  description: "sets the global time",
  commandArgs: [
    {name: "hour", help: "Hour format HH"},
    {name: "minute", help: "Minute format MM"}
  ],
  restricted: false,
  argsRequired: true
}