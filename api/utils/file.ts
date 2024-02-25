import { writeFileSync, readFileSync, readdirSync } from "fs";
import Logger from "./logger";

export function saveFile(fileName: string, data: object | string): void {
  if (Logger.level !== "debug") {
    return;
  }
  const file = typeof data === "string" ? data : JSON.stringify(data, null, 2);
  writeFileSync(fileName, file, {
    encoding: "utf8",
    flag: "w+",
    mode: 0o666,
  });
  Logger.debug(`>>> saved file: ${fileName}`);
}

export function readFile(fileName: string) {
  Logger.debug(`>>> reading file: ${fileName}`);
  const file = readFileSync(fileName, "utf8");
  return JSON.parse(file);
}

export function getAppVersion(): string {
  const raw = readFileSync("./package.json");
  const packageJson = JSON.parse(raw.toString());
  return packageJson.version;
}
