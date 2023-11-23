import fs from "fs/promises";
import { Queue } from "./queue";
import { Household } from "./buildings/Household";
import { Building } from "./interfaces/Building";
import { Clinic } from "./buildings/Clinic";
import { Land } from "./buildings/Land";
import { ClinicSymbol, HouseholdUnvaccinated } from "./congif";

export class Mappy {
  private _mapData: Building[];
  private _numberBlocks: number;
  private _numberCities: number;
  private _maxNumBlocks: number;
  private _cities: string[];
  // constructors, methods, etc
  constructor() {
    //There are 18 blocks on this array
    this._numberBlocks = 0;
    this._numberCities = 0;
    this._maxNumBlocks = 0;
    this._mapData = [];
    this._cities = [];
  }
  async createMap(file: string) {
    //Read File
    const json = await fs.readFile(file, "utf-8");
    const { city: data } = JSON.parse(json);

    //Calculate Boundarys
    this.calculateCityBoundary(data);

    //Set order in cities
    this._cities = Object.keys(data);

    // Set a location for each Building
    this._cities.map((loc, index) => {
      //Create households
      data[loc].households.map((house: any) => {
        this._mapData[house.blockNum + index * this._maxNumBlocks] =
          new Household(house.inhabitants, loc, house.blockNum);
      });
      //create Clinics
      data[loc].clinics.map((clin: any) => {
        this._mapData[clin.blockNum + index * this._maxNumBlocks] = new Clinic(
          clin
        );
      });
    });
  }

  printMap() {
    for (
      let index = 0;
      index < this._numberBlocks;
      index += this._maxNumBlocks
    ) {
      const barrio = this._mapData.slice(index, index + this._maxNumBlocks);
      console.log(barrio.map((x) => x.getLabel()));
    }
  }

  registerForShots() {
    this._mapData
      .filter((block) => block.getLabel() === HouseholdUnvaccinated)
      .forEach((block) => {
        if (block instanceof Household) {
          //Get Unvaccinated
          const unvaccinated = block.getUnvaccinated();
          //Get closest Clinic
          const city = this.getCityBoundary(block.getCity());
          //expand in linear + and -.

          for (let index = 1; index < this._maxNumBlocks; index++) {
            //get Left
            const left = block.getBlock() - index;

            if (left >= 0 && city[left].getLabel() === ClinicSymbol) {
              (city[left] as Clinic).receivePatients(unvaccinated);
              break;
            }
            //get Right
            const right = block.getBlock() + index;
            if (
              right < this._maxNumBlocks &&
              city[right].getLabel() === ClinicSymbol
            ) {
              (city[right] as Clinic).receivePatients(unvaccinated);
              break;
            }
          }

          //Update Unvaccinated
          unvaccinated.forEach((person) => person.setVaccinated(true));
        }
      });
  }

  getCityBoundary(city: string) {
    const start = this._cities.indexOf(city) * this._maxNumBlocks;
    const end = start + this._maxNumBlocks;
    return this._mapData.slice(start, end);
  }
  getcities() {
    return this._cities;
  }

  private calculateCityBoundary(data: any) {
    //Determine number of cities to know where each block starts
    this._numberCities = Object.keys(data).length;

    //calculate max number of blocks
    for (const city in data) {
      const blocks = data[city].households.length + data[city].clinics.length;
      if (blocks > this._maxNumBlocks) this._maxNumBlocks = blocks;
    }
    this._numberBlocks = this._maxNumBlocks * this._numberCities;

    //Create an array with maxnumber of blocks and fill it with land
    this._mapData = new Array(this._numberBlocks).fill(new Land());
  }
}
