import { IReport } from "./interfaces/Report";
export class ReportMaker {
  private report: IReport;

  constructor(report: IReport) {
    this.report = report;
  }

  printDetails() {
    return this.report.printDetails();
  }
}
