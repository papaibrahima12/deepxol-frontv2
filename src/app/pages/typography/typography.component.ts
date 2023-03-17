import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'typography-cmp',
    moduleId: module.id,
    templateUrl: 'typography.component.html'
})
export class TypographyComponent implements OnInit {
  selectedDossier: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialog: MatDialog,
    private bsModalService: BsModalService,
  ) {
  }

  ngOnInit() {
    this.selectedDossier = this.data.dossier
  }
  closeModal(): void {
    this._matDialog.closeAll();
  }
}
