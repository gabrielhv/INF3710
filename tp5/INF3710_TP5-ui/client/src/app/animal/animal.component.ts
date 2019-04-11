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
                      animalid: string,
                      animalname: string,
                      animaltype: string,
                      description: string,
                      inscriptiondate: string,
                      animalstate: string,
                      ownerid: string ): void {

    const animal: any = {
      "animalid": animalid,
      "animalname": animalname,
      "animaltype": animaltype,
      "description": description,
      "inscriptiondate": inscriptiondate,
      "animalstate": animalstate,
      "ownerid": ownerid
    };

    this.communicationService.insertAnimal(animal).subscribe((res: number) => {
      if (res > 0) {
          this.communicationService.filter("update");
      }
      this.duplicateError = (res === -1);
    });
  }

}
