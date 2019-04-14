import {Component, Inject} from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: "app-dialog-overview",
  templateUrl: "dialog-overview.component.html",
  styleUrls: ["dialog-overview.component.css"],
})
export class DialogOverviewComponent {

  public animal: string;
  public name: string;

  public constructor(public dialog: MatDialog) {}

  public openDialog(): void {
    const dialogRef: any = this.dialog.open(DialogOverviewDialogComponent, {
      width: "500px",
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("The dialog was closed");
      this.animal = result;
    });
  }

}

@Component({
  selector: "app-dialog-overview-dialog",
  templateUrl: "dialog.html",
  styleUrls: ["dialog.css"]
})
export class DialogOverviewDialogComponent {

  public constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
