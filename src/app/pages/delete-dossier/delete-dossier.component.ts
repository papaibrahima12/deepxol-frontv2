import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Dossier } from 'app/models/dossier';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DossierService } from '../../services/dossier.service';

@Component({
  selector: 'app-delete-dossier',
  templateUrl: './delete-dossier.component.html',
  styleUrls: ['./delete-dossier.component.scss']
})
export class DeleteDossierComponent {
  public data!: Dossier;
  public onClose: Subject<boolean> = new Subject();
  selectedDossier: any;
  constructor(
    private bsModalService: BsModalService,
    private dossierService: DossierService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.selectedDossier = this.data;
  }

  closeModal(): void {
    this.bsModalService.hide();
  }

  deleteData(): void {
    this.dossierService.deleteDossier(this.selectedDossier._id).subscribe(response => {
      this.toastrService.success('Succés', 'Dossier supprimé avec succés!');
      this.onClose.next(true);
      this.closeModal();
    }, (err: HttpErrorResponse) => {
      this.toastrService.success('Erreur', 'Suppression échouée!');
      throw new Error(err.error);
    });
  }
}
