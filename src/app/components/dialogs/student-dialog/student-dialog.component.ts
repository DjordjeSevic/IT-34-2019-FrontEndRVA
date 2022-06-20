import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { Status } from 'src/app/models/status';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {

  flag!: number;
  statusi!: Status[];

  constructor(public snackBar:MatSnackBar,
    public studentService: StudentService,
    public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Student,
    public statusService: StatusService) { }

  ngOnInit(): void {
    this.statusService.getAllStatus().subscribe(result => {
      this.statusi = result;
    })
  }

  public compare(a:any, b:any){
    return a.id == b.id;
  }

  public add() {
    this.studentService.insertStudent(this.data)
      .subscribe(data => this.snackBar.open("Uspesno ste dodali studenta: " + data.id, "U redu", { duration: 3500 })),
      (error: Error) => {
        console.log(error.name + " " + error.message),
          this.snackBar.open("Doslo je do greske", "U redu", { duration: 2500 })
      }
  }

  public update() {
    this.studentService.updateStudent(this.data).subscribe
      (data => { this.snackBar.open("Student: " + data.id + " je uspesno azuriran", "U redu", { duration: 3500 }) }),
      (error: Error) => {
        console.log(error.name + " " + error.message),
        this.snackBar.open("Doslo je do greske", "U redu", { duration: 2500 })
      }
  }

  public delete() {
    this.studentService.deleteStudent(this.data.id).subscribe
      (() => { this.snackBar.open("Student je uspesno obrisan", "U redu", { duration: 3500 }) }),
      (error: Error) => {
        console.log(error.name + " " + error.message),
        this.snackBar.open("Doslo je do greske", "U redu", { duration: 2500 })
      }
  }

  public cancel(){
    this.dialogRef.close();
    this.snackBar.open("Odustali ste od promena", "U redu", {duration:3500});
  }


}
