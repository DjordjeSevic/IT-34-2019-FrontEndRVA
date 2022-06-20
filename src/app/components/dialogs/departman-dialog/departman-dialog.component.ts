import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Fakultet } from 'src/app/models/fakultet';
import { FakultetService } from 'src/app/services/fakultet.service';
import { Departman } from 'src/app/models/departman';
import { DepartmanService } from 'src/app/services/departman.service';

@Component({
  selector: 'app-departman-dialog',
  templateUrl: './departman-dialog.component.html',
  styleUrls: ['./departman-dialog.component.css']
})
export class DepartmanDialogComponent implements OnInit {
  flag!: number;
  fakulteti!: Fakultet[];

  constructor(public snackBar:MatSnackBar,
    public departmanService: DepartmanService,
    public dialogRef: MatDialogRef<DepartmanDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Departman,
    public fakultetService: FakultetService) { }

  ngOnInit(): void {
    this.fakultetService.getAllFakultets().subscribe(result => {
      this.fakulteti = result;
    })
  }

  public compare(a:Departman, b:Departman){
    return a.id == b.id;
  }

  public add() {
    this.departmanService.insertDepartman(this.data).subscribe(data => {
      this.snackBar.open('Uspešno dodat departman: ' + data.id ,'OK', {duration: 2500} ), 
    (error: Error) => {
      console.log(error.name + " " + error.message);
      this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
  }
    );
  }

  public update() {
    this.departmanService.updateDepartman(this.data).subscribe(data => {
      this.snackBar.open('Uspešno izmenjen departman: ' + data.id,'OK', {duration: 2500} ), 
    (error: Error) => {
      console.log(error.name + " " + error.message);
      this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
  }
    );
  }

  public delete() {
    this.departmanService.deleteDepartman(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan departman!','OK', {duration: 2500} ), 
    (error: Error) => {
      console.log(error.name + " " + error.message);
      this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
  }
    );
  }
  
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {duration:1000});
  }

}
