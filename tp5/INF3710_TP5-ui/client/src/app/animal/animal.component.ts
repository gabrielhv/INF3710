import { Component, Input } from "@angular/core";
import { FormControl, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { CommunicationService } from "../communication.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted: boolean | null = form && form.submitted;

    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: "app-animal",
  templateUrl: "./animal.component.html",
  styleUrls: ["./animal.component.css"]
})
export class AnimalComponent {

  @Input() public myanimalid: string;
  @Input() public myanimalname: string;
  @Input() public myanimaltype: string;
  @Input() public mydescription: string;
  @Input() public myinscriptiondate: string;
  @Input() public myanimalstate: string;
  @Input() public myownerid: string;
  @Input() public isForUpdate: boolean;

  public readonly descriptionMaxLength: number = 200;
  public readonly entryMaxLength: number = 20;

  public ownerIDs: string[];
  public duplicateError: boolean = false;

  public constructor(private communicationService: CommunicationService) {  }

  public animalFormControl: FormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(this.entryMaxLength),
  ]);

  public animalDescriptionFormControl: FormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(this.descriptionMaxLength),
  ]);

  public matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

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

  public updateAnimal(
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

    this.communicationService.updateAnimal(animal).subscribe((res: number) => {
      if (res > 0) {
        this.communicationService.filter("update");
      }
      this.duplicateError = (res === -1);
    });
  }

  public updateOwnerIDs(): void {
    this.communicationService.getAllOwnerIDs().subscribe((ownerIDs: string[]) => {
      this.ownerIDs = ownerIDs;
    });
  }

  public selectOwnerID(ownerID: string): void {
    this.myownerid = ownerID;
  }

}
