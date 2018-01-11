import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { TasksService } from './services/tasks.service';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';

import { AppRouterModule } from './app.route';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouterModule,
    ReactiveFormsModule
  ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
