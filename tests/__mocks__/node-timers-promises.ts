let setTimeout = jest.fn();

jest.mock("node:timers/promises", () => ({
  ...jest.requireActual("node:timers"),
  setTimeout,
}));

export default {
  setTimeout,
};
