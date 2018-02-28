import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes  } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {ModalModule} from 'ng-bootstrap-modal';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { CommonService } from './modules/common/Common.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/Login.component';
import { LoginService} from './modules/login/Login.service';
import { HomeComponent } from './modules/home/Home.component';
import { BigQueryComponent } from './modules/bigquery/view/BigQuery.component';
import { BigQueryService } from './modules/bigquery/view/BigQuery.service';
import { NotificationComponent } from './modules/notification/create/Notification.component';
import { NotificationService } from './modules/notification/create/Notification.service';
import { ForceDirectedChartBaseComponent } from './modules/chart/ForceDirectChartBase.component';
import { ForceDirectedChartUserComponent } from './modules/chart/ForceDirectChartUser.component';
import { ForceDirectedDataService } from './modules/chart/ForceDirectChart.service';

import { UserModelComponent } from './modules/model/UserModel.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },
  {
    path: 'app',
    component: AppComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'bigquery-view',
    component: BigQueryComponent
  },
  {
    path: 'notification',
    component: NotificationComponent
  },
  {
    path: 'userDetails',
    component: UserModelComponent
  }
];

@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]
})
export class DemoMaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BigQueryComponent,
    NotificationComponent,
    ForceDirectedChartBaseComponent,
    ForceDirectedChartUserComponent,
    UserModelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [UserModelComponent],
  providers: [
    {provide: CommonService, useClass: CommonService},
    {provide: LoginService, useClass: LoginService},
    {provide: BigQueryService, useClass: BigQueryService},
    {provide: NotificationService, useClass: NotificationService},
    {provide: ForceDirectedDataService, useClass: ForceDirectedDataService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
