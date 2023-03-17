import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dossier } from 'app/models/dossier';
import { DossierService } from 'app/services/dossier.service';
import { TypographyComponent } from '../typography/typography.component';
import { UserComponent } from '../user/user.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { DeleteDossierComponent } from '../delete-dossier/delete-dossier.component';


@Component({
  selector: 'app-list-dossiers',
  templateUrl: './list-dossiers.component.html',
  styleUrls: ['./list-dossiers.component.scss']
})
export class ListDossiersComponent implements OnInit {
  dossier$ : Observable<Dossier[]>;
  fetchedDossier: any;
  modalRef?: BsModalRef;
  
  constructor(private _matDialog:MatDialog,
    private _dossierService: DossierService,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getAllDossiers();
    this._dossierService.fetchedNodes$.subscribe({
      next: (response: Dossier[]) => {
        this.fetchedDossier = response
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }
  getAllDossiers() {
     this.dossier$ = this._dossierService.getAllDossiers();
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
  updateDossier($event: Dossier): void {
    this.modalRef = this.modalService.show(UserComponent, {
      initialState: {
        data: $event
      },
      animated: true,
    });
    this.modalRef.content.onClose.subscribe((response: boolean) => {
      if (response) {
        this.getAllDossiers();
      }
    })
    console.log('update');
  }

  deleteDossier($event: Dossier): void {
    this.modalRef = this.modalService.show(DeleteDossierComponent, {
      initialState: {
        data: $event
      },
      animated: true,
    });
    this.modalRef.content.onClose.subscribe((response: boolean) => {
      if (response) {
        this.getAllDossiers();
      }
    })
    console.log('delete');
  }

}
