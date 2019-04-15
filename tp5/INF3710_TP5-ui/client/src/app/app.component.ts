import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {FormControl} from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Animal } from "../../../common/tables/Animal";
import { Treatment } from "../../../common/tables/Treatment";
import { CommunicationService } from "./communication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public nameSuggestionsControl: FormControl = new FormControl();
    public nameSuggestions: string[] = [];
    public filteredSuggestions: Observable<string[]>;

    public route: string;

    public constructor(private communicationService: CommunicationService, location: Location, router: Router) {
        router.events.subscribe((val) => {
            this.route = (location.path() !== "") ? location.path() : "";
          });
    }

    public readonly title: string = "INF3710 TP5";
    public animals: Animal[] = [];
    public animalsSearch: Animal[] = [];

    public ngOnInit(): void {
        this.communicationService.listen().subscribe((m: any) => {
            console.log(m);
            this.getAnimals();
        });

        this.filteredSuggestions = this.nameSuggestionsControl.valueChanges
      .pipe(
        startWith(""),
        map((value) => this._filter(value))
      );

    }

    public _filter(value: string): string[] {
        const filterValue = value;
        return this.nameSuggestions.filter((option) => option.includes(filterValue));
    }

    public getAnimals(): void {
        this.communicationService.getAnimals().subscribe((animals: Animal[]) => {
            this.animals = animals;

            this.nameSuggestions = [];
            for (let i = 0; i < animals.length; i++) {
                this.nameSuggestions.push(animals[i].animalname);
            }
        });
    }

    public getAnimalsNamesSuggestions(searchEntry: string): void {
        this.communicationService.getAnimalsSuggestions(searchEntry).subscribe((result: string[]) => {
            this.nameSuggestions = result;
        });
    }

    public getAnimalsFromSearchEntry(searchEntry: string): void {
        this.communicationService.getAnimalsSearchResult(searchEntry).subscribe((result: Animal[]) => {
            this.animalsSearch = result;
        });
    }

    public getAnimalBill(animalid: string): void {
        this.communicationService.getAnimalBill(animalid).subscribe((bill: number) => {
            if (bill) {
                alert("Total amount of the bill: " + bill.toString());
            } else {
                alert("No bill linked to this animal");
            }
        });
    }

    public getAnimalTreatments(animalid: string): void {
        this.communicationService.getAnimalTreatments(animalid).subscribe((treatments: Treatment[]) => {
            if (treatments.length > 0) {
                let message: string = "Treatments: \n\n";
                treatments.forEach((treatment) => {
                    message += "Treatment number: " + treatment.treatmentnumber + "\n";
                    message += "Description: " + treatment.description + "\n";
                    message += "Cost: " + treatment.treatmentcost + "\n\n";
                });
                alert(message);
            } else {
                alert("No treatment linked to this animal");
            }
        });
    }

    public createDB(): void {
        this.communicationService.setUpDatabase().subscribe((res: any) => {
            console.log(res);
        });
    }

    public deleteAnimal(animal: any): void {
        this.communicationService.deleteAnimal(animal).subscribe((animals: Animal[]) => {
            this.animals = animals;
        });
    }
}
