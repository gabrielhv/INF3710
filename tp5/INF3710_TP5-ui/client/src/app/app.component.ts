import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Animal } from "../../../common/tables/Animal";
import { Treatment } from "../../../common/tables/Treatment";
import { CommunicationService } from "./communication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public route: string;

    public constructor(private communicationService: CommunicationService, location: Location, router: Router) {
        router.events.subscribe((val) => {
            this.route = (location.path() !== "") ? location.path() : "";
          });
    }

    public readonly title: string = "INF3710 TP5";
    public animals: Animal[] = [];

    public ngOnInit(): void {
        this.communicationService.listen().subscribe((m:any) => {
            console.log(m);
            this.getAnimals();
        });
    }

    public getAnimals(): void {
        this.communicationService.getAnimals().subscribe((animals: Animal[]) => {
            this.animals = animals;
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
