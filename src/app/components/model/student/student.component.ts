import { Component, OnInit, OnDestroy, ViewChild, OnChanges, Input, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { StudentDialogComponent } from '../../dialogs/student-dialog/student-dialog.component';
import { Departman } from 'src/app/models/departman';
import { Status } from 'src/app/models/status';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnChanges {
  displayedColumns = ['id', 'status', 'ime', 'prezime', 'brojIndeksa', 'departman','actions'];
  dataSource! : MatTableDataSource<Student>;
  subscription!: Subscription;
  @Input() selectedDepartmanBottom!: Departman;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private studentService: StudentService, private dialog: MatDialog) { }

  ngOnChanges(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.subscription = this.studentService.
    getStudentsByDepartman(this.selectedDepartmanBottom.id).subscribe
      (data => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; }),
      (error: Error) => { console.log(error.name + " " + error.message) }
    
  }

  public openDialog(flag: number, id?: number, status?: Status, ime?: string, prezime?: string,
    brojIndeksa?:string, departman?: Departman) {
    const dialogRef = this.dialog.open(StudentDialogComponent, { data: { id,status,ime,prezime,brojIndeksa,departman } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.componentInstance.data.departman = this.selectedDepartmanBottom;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.loadData();
      }
    })
  }

  public applyFilter(filter: any) {
    filter = filter.target.value;
    filter = filter.trim();
    filter = filter.toLocaleLowerCase();
    this.dataSource.filter = filter;
  }

}
