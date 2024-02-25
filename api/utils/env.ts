import { PRIVATE_ENVIRONMENT } from "../../environment";

export function getEnvironment(): string {
  return PRIVATE_ENVIRONMENT.ENVIRONMENT || "production";
}
