import { People } from "./People";
import { Building } from "./interfaces/Building";
import { Queue } from "./queue";

export class Clinic implements Building {
  private _queue: Queue;
  private _name: string;
  private _blockNum: number;
  private _staff: number;

  constructor({
    name,
    blockNum,
    staff,
  }: {
    name: string;
    blockNum: number;
    staff: number;
  }) {
    this._queue = new Queue();
    this._blockNum = blockNum;
    this._name = name;
    this._staff = staff;
  }

  receivePatients(patients: People[]) {
    patients.map((person) => this._queue.enqueue(person));
  }
  getLabel(): string {
    return "C";
  }
}
