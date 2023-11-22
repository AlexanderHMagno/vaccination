import { People } from "../People";

People;
export interface Building {
  getLabel(): string;
  receivePatients(person: People[]): void;
}
