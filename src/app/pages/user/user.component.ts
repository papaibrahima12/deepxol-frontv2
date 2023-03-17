import {Component, Inject, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {DossierService} from "../../services/dossier.service";
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { Validators } from '@angular/forms';
import { Dossier } from 'app/models/dossier';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit{
  public data?: Dossier;
  updateDossierForm: FormGroup = new FormGroup({
    diagnostic: new FormControl('',Validators.required),
    antecedant: new FormControl('',Validators.required),
    implantationOlder: new FormControl('',Validators.required),
    fibrilationLoad: new FormControl('',Validators.required),
    insuffisanceCardiaque: new FormControl('',Validators.required),
    tach_arter: new FormControl('',Validators.required),
    tach_arter_value: new FormControl('',Validators.required),
    chads_vasc: new FormControl('',Validators.required),
  });
  selectedDossier: any;
  antecedantList: string[] = ['Hypertension', 'Diabete', 'AVC', 'Apnee de Sommeil', 'Obesite', 'Asthme'];
  public onClose: Subject<boolean> = new Subject();
  fetchedDossier: any;
  constructor(
    private bsModalService: BsModalService,
    private toastrService: ToastrService,
    private _dossierService: DossierService,
  ) { }

  ngOnInit() {
    this.selectedDossier = this.data;
    this.doInitFormUpdate();

  }
  doInitFormUpdate() {
    this.updateDossierForm.setValue({
      diagnostic: this.data?.diagnostic,
      antecedant: this.data?.antecedant,
      implantationOlder: this.data?.implantationOlder,
      fibrilationLoad: this.data?.fibrilationLoad,
      insuffisanceCardiaque: this.data?.insuffisanceCardiaque,
      tach_arter: this.data?.tach_arter,
      tach_arter_value: this.data?.tach_arter_value,
      chads_vasc: this.data?.chads_vasc,
    })
  }

  updateDossier(id: string, body: Dossier) {
    this._dossierService.updateDossier(id,body).subscribe(response =>{
      this.toastrService.success('Succès', 'Modification Réussie!');
      this.onClose.next(true);
      this.closeModal();
    }, (err: HttpErrorResponse) => {
      this.toastrService.error('Erreur', 'Erreur lors de la modification du dossier!');
      throw new Error(err.error);
    })
  }

  submit() {
      this.updateDossier(this.selectedDossier._id, this.updateDossierForm.value);
  }

  closeModal(): void {
    this.bsModalService.hide();
  }
}
