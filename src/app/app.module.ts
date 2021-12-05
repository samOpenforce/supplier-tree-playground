import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularResizeEventModule } from 'angular-resize-event';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SupplierPanelComponent } from './shared/supplier-panel/supplier-panel.component';
import { FacilityPanelComponent } from './shared/facility-panel/facility-panel.component';
import { ProductPanelComponent } from './shared/product-panel/product-panel.component';
import { ChainService } from './services/chain.service';

@NgModule({
  declarations: [AppComponent, SupplierPanelComponent, FacilityPanelComponent, ProductPanelComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    AngularResizeEventModule,
    HttpClientModule,
  ],
  providers: [ChainService],
  bootstrap: [AppComponent],
})
export class AppModule {}
