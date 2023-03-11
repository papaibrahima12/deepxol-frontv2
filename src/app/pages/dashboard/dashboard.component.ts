import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Chart from 'chart.js';
import {Dossier} from "../../models/dossier";
import {TypographyComponent} from "../typography/typography.component";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {of, tap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DossierService} from "../../services/dossier.service";
import {UserComponent} from "../user/user.component";

export class Service {

  opts = [];
  constructor(private http: HttpClient) {}

  getData() {
    return this.opts.length
      ? of(this.opts)
      : this.http
        .get<any>(`${environment.apiUrl}/api/dossier`)
        .pipe(tap((data) => (this.opts = data)));
  }
}

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  fetchedStatistics: any
  total: any
  fibrillation: any
  notFibirillation: any;
  fetchedDossier: any
  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

  constructor(
    private _matDialog:MatDialog,
    private _dossierService: DossierService,
    private _formBuilder: FormBuilder
  ) {}

    ngOnInit(){
      this._dossierService.fetchedStatistics$.subscribe({
        next: (response: any) => {
          this.fetchedStatistics = response
          this.total = this.fetchedStatistics?.total
          this.fibrillation = this.fetchedStatistics?.fibrillation
          this.notFibirillation = this.fetchedStatistics?.notFibrillation
        },
        error: (errors) => {
          console.log(errors);
        },
      });
      this._dossierService.fetchedNodes$.subscribe({
        next: (response: Dossier[]) => {
          this.fetchedDossier = response
        },
        error: (errors) => {
          console.log(errors);
        },
      });
      this.chartColor = "#FFFFFF";

      var speedCanvas = document.getElementById("speedChart");
      var dataFirst = {
        data: [0, 0, this.fibrillation],
        fill: false,
        borderColor: '#fb7223',
        backgroundColor: 'transparent',
        pointBorderColor: '#fb7223',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };

      var dataSecond = {
        data: [0, 0,this.notFibirillation],
        fill: false,
        borderColor: '#51CACF',
        backgroundColor: 'transparent',
        pointBorderColor: '#51CACF',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var speedData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [dataFirst, dataSecond]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: 'top'
        }
      };

      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        hover: false,
        data: speedData,
        options: chartOptions
      });
    }
  openDetails(dossier: Dossier): void {
    // Open Dialog Modal
    this._matDialog.open(TypographyComponent, {
      autoFocus: false,
      data: {
        dossier
      },
      height: '60%',
      width: '60%'
    })
  }

  updateDossier(dossier: Dossier): void {
    // Open Dialog Modal
    this._matDialog.open(UserComponent, {
      autoFocus: false,
      data: {
        dossier
      },
      height: '60%',
      width: '60%'
    })
  }
}
