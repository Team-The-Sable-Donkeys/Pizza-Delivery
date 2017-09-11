import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';
import { AboutContactComponent } from './about-contact/about-contact.component';
import { MessagesService } from './../services/messages/messages.service';

// no need for dialog and browserAnimations as such are not implemented
// dialog
import { MdDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    AboutRoutingModule
  ],
  declarations: [
    AboutComponent,
    AboutContactComponent
  ],
  providers: [MessagesService],
  // No need to export the decleared components, no harm either
  exports: [AboutComponent, AboutContactComponent]
})
export class AboutModule { }
