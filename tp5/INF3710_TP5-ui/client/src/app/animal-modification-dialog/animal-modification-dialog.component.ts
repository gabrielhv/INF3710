import {Component, Inject, Input} from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import { Animal } from "../../../../common/tables/Animal";
@Component({
  selector: "app-dialog-overview",
  templateUrl: "dialog-overview.component.html",
  styleUrls: ["dialog-overview.component.css"],
})
export class DialogOverviewComponent {

  @Input() public myAnimal: Animal;

  public constructor(public dialog: MatDialog) {}

  public openDialog(): void {
    const dialogRef: any = this.dialog.open(DialogOverviewDialogComponent, {
      width: "500px",
      data: {animal: this.myAnimal}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("updated");
    });
  }

}

@Component({
  selector: "app-dialog-overview-dialog",
  templateUrl: "dialog.html",
  styleUrls: ["dialog.css"]
})
export class DialogOverviewDialogComponent {

  public myAnimal: Animal;

  public constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.myAnimal = data.animal;
    }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
