import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fakultet } from 'src/app/models/fakultet';
import { FakultetService } from 'src/app/services/fakultet.service';

@Component({
  selector: 'app-fakultet-dialog',
  templateUrl: './fakultet-dialog.component.html',
  styleUrls: ['./fakultet-dialog.component.css']
})
export class FakultetDialogComponent implements OnInit {
  flag!: number;

  constructor(public snackBar:MatSnackBar,
    public fakultetService: FakultetService,
    public dialogRef: MatDialogRef<FakultetDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Fakultet) { }

  ngOnInit(): void {
  }

  public add() {
    this.fakultetService.insertFakultet(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat fakultet!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public update() {
    this.fakultetService.updateFakultet(this.data).subscribe(() => {
      this.snackBar.open('Uspešno izmenjen fakultet!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public delete() {
    this.fakultetService.deleteFakultet(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan fakultet!','OK', {duration: 2500} );
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
