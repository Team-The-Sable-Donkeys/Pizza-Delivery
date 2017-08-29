import { SharedRoutingModule } from './shared-routing.module';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  declarations: [
    NavComponent,
    FooterComponent
  ],
  exports: [
    CommonModule,
    NavComponent,
    FooterComponent
  ]
})
export class SharedModule { }
