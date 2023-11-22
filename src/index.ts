import { Mappy } from "./mappy";
import { ReportMaker } from "./ReportMaker";
import { ComplexReport } from "./ComplexReport";

async function main() {
  const map = new Mappy();
  await map.createMap("./data.json");
  map.printMap();
  console.log("---End of Map---");
  map.registerForShots();
  const report = new ReportMaker(new ComplexReport(map));
  report.printDetails();
  console.log("---End of Report---");
  map.printMap();
  console.log("---End of Map---");
}

main();
