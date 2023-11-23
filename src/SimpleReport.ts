import { Clinic } from "./Clinic";
import { Mappy } from "./mappy";
import { IReport } from "./interfaces/Report";
import { ClinicSymbol } from "./congif";

export class SimpleReport implements IReport {
  private _map: Mappy;
  constructor(map: Mappy) {
    this._map = map;
  }

  printDetails() {
    //cities

    const cities = this._map.getcities();

    cities.forEach((city) => {
      const clinics = this._map
        .getCityBoundary(city)
        .filter((x) => x.getLabel() === ClinicSymbol)
        .map((c) => c as Clinic);

      console.group(city);
      clinics.map((clinica) => {
        console.group(clinica.getName());
        console.log("People Waiting:", clinica.getPeopleInQueue());
        console.groupEnd();
      });
      console.groupEnd();
    });
  }
}
