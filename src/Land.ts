import { Building } from "./interfaces/Building";

export class Land implements Building {
  receivePatients() {}
  getLabel(): string {
    return "X";
  }
}
