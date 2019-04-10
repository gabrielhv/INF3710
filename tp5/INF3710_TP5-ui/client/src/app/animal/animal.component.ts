import { Component } from "@angular/core";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-animal",
  templateUrl: "./animal.component.html",
  styleUrls: ["./animal.component.css"]
})
export class AnimalComponent {

  public constructor(private communicationService: CommunicationService) { }

  public duplicateError: boolean = false;

  public insertAnimal(
                      animalID: string,
                      animalName: string,
                      animalType: string,
                      description: string,
                      inscriptionDate: string,
                      animalstate: string,
                      ownerID: string ): void {

    const animal: any = {
      "animalID": animalID,
      "animalName": animalName,
      "animalType": animalType,
      "description": description,
      "inscriptionDate": inscriptionDate,
      "animalstate": animalstate,
      "ownerID": ownerID
    };

    this.communicationService.insertAnimal(animal).subscribe((res: number) => {
      if (res > 0) {
          this.communicationService.filter("update");
      }
      this.duplicateError = (res === -1);
    });
  }

}
