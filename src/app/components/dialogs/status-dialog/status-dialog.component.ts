import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from 'src/app/models/status';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent implements OnInit {

  flag!: number;

  constructor(public snackBar:MatSnackBar,
    public statusService: StatusService,
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Status) { }

  ngOnInit(): void {
  }

  public add() {
    this.statusService.insertStatus(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat status!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public update() {
    this.statusService.updateStatus(this.data).subscribe(() => {
      this.snackBar.open('Uspešno izmenjen status!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public delete() {
    this.statusService.deleteStatus(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan status!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }
  
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {duration:1000});
  }

}
