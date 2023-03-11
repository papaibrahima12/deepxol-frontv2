import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'typography-cmp',
    moduleId: module.id,
    templateUrl: 'typography.component.html'
})
export class TypographyComponent implements OnInit {
  selectedDossier: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _matDialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.selectedDossier = this.data.dossier
  }
}
