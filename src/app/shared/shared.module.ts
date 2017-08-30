import { SharedRoutingModule } from './shared-routing.module';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  declarations: [
    NavComponent,
    FooterComponent,
    UnauthorizedComponent
],
  exports: [
    CommonModule,
    NavComponent,
    FooterComponent,
    UnauthorizedComponent,
  ]
})
export class SharedModule { }
