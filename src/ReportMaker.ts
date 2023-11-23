import { Report1 } from "./interfaces/Report";
export class ReportMaker {
  private _reportApp: Report1;

  constructor(reportApp: Report1) {
    this._reportApp = reportApp;
  }

  printDetails() {
    return this._reportApp.printDetails();
  }
}
