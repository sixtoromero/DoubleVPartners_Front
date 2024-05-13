import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PeriodicElement } from 'src/app/interfaces/periodicelement.interface';
import { Statistics } from 'src/app/interfaces/statistics.interface';
import { StatisticsService } from 'src/app/services/statistics.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {
  statistics: Statistics[] = [];
  displayedColumns: string[] = ['mes', 'cantidad_inmuebles', 'total_ventas'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private statisticsService: StatisticsService,
    private ngxService: NgxUiLoaderService){
      this.getStatistics();
    }

    getStatistics(){

      this.statisticsService.getStatistics()
      .subscribe({
        next: resp => {
          this.ngxService.stop();

          if (resp.msg !== "success"){
            Swal.fire('Error', resp.msg, 'error');
            return;
          }

          this.statistics = resp.statisticsData;

          this.dataSource = new MatTableDataSource<Statistics>(this.statistics);
          this.dataSource.paginator = this.paginator;

          console.log(this.statistics);

          //resp.statisticsData

        },
        error: err => {
          this.ngxService.stop();
          if (err.error.msg == "Token no válido"){
            localStorage.removeItem('doublevpartnerstoken');
            this.router.navigateByUrl('/login');
          }else{
            Swal.fire('Error', err.error.msg, 'error');
          }
        }
      });
    }



}
