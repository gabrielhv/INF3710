import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Animal } from "../../../common/tables/Animal";
import { Hotel } from "../../../common/tables/Hotel";
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
            if (location.path() !== "") {
              this.route = location.path();
            } else {
              this.route = "";
            }
          });
    }

    public readonly title: string = "INF3710 TP5";
    public hotels: Hotel[] = [];
    public animals: Animal[] = [];

    public ngOnInit(): void {
        this.communicationService.listen().subscribe((m:any) => {
            console.log(m);
            this.getAnimals();
        });
    }

    public getHotels(): void {
        this.communicationService.getHotels().subscribe((hotels: Hotel[]) => {
            this.hotels = hotels;
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
