import { People } from "./People";
import { HouseholdFull, HouseholdUnvaccinated } from "./congif";
import { Building } from "./interfaces/Building";

type P = { phn: string; fullName: string; isVaccinated: boolean; age: number };

export class Household implements Building {
  private _inhabitants: People[];
  private _city: string;
  private _block: number;

  constructor(inhabitants: P[], city: string, block: number) {
    this._inhabitants = inhabitants.map((person) => new People({ ...person }));
    this._block = block;
    this._city = city;
  }

  getLabel(): string {
    return this.householdFullVacinated()
      ? HouseholdFull
      : HouseholdUnvaccinated;
  }

  getUnvaccinated() {
    return this._inhabitants.filter(
      (person: People) => !person.getVaccinatedStatus()
    );
  }

  getBlock() {
    return this._block;
  }
  getCity() {
    return this._city;
  }

  private householdFullVacinated() {
    return this._inhabitants.every((person: People) =>
      person.getVaccinatedStatus()
    );
  }
}
