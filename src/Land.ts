import { LandSymbol } from "./congif";
import { Building } from "./interfaces/Building";

export class Land implements Building {
  getLabel(): string {
    return LandSymbol;
  }
}
