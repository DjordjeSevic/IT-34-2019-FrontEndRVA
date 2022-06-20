import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Departman } from 'src/app/models/departman';
import { DepartmanService } from 'src/app/services/departman.service';
import { DepartmanDialogComponent } from '../../dialogs/departman-dialog/departman-dialog.component';
import { Fakultet } from 'src/app/models/fakultet';

@Component({
  selector: 'app-departman',
  templateUrl: './departman.component.html',
  styleUrls: ['./departman.component.css']
})
export class DepartmanComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'oznaka', 'fakultet', 'actions'];
  dataSource! : MatTableDataSource<Departman>;
  subscription!: Subscription;
  selectedDepartmanTop!: Departman;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private departmanService: DepartmanService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.departmanService.getAllDepartmans().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
    }
    );
  }

  openDialog(flag: number, id?:number, naziv?:string, oznaka?: string, fakultet?:Fakultet) {
    const dialogRef = this.dialog.open(DepartmanDialogComponent, 
      {data:{id,naziv,oznaka,fakultet}});

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res === 1)
        this.loadData();
    });
  }

  public applyFilter(filter: any) {
    filter = filter.target.value;
    filter = filter.trim();
    filter = filter.toLocaleLowerCase();
    this.dataSource.filter = filter;
  }

  public select(row:any){
    console.log(row);
    this.selectedDepartmanTop = row;
  }

}
