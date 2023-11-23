import { currentIntake } from "./congif";

export class People {
  private phn;
  private fullName;
  private isVaccinated;
  private age;
  constructor({
    phn,
    fullName,
    isVaccinated,
    age,
  }: {
    phn: string;
    fullName: string;
    isVaccinated: boolean;
    age: number;
  }) {
    this.phn = phn;
    this.fullName = fullName;
    this.isVaccinated = isVaccinated;
    this.age = age;
  }

  setVaccinated(confirm: boolean) {
    this.isVaccinated = confirm;
  }

  getVaccinatedStatus() {
    return this.isVaccinated;
  }

  overAgeToVaccine() {
    return this.age >= currentIntake;
  }
}
