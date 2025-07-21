import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // ✅ IMPORTANT
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule, // ✅ Required for toastr animations
      FormsModule,
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right', // ✅ default position
        preventDuplicates: true,
        progressBar: true
      })
    )
  ]
};
