import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import {DossierListResolver} from "../../services/dossier.resolver";
import {DashboardResolver} from "../../pages/dashboard/dashboard.resolver";
import { ListDossiersComponent } from '../../pages/list-dossiers/list-dossiers.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',   resolve: { nodes: DossierListResolver,DashboardResolver},    component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'dossiers',        component: ListDossiersComponent },
];
