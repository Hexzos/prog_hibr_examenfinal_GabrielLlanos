import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { enableProdMode } from '@angular/core';
import { defineCustomElements as jeepSqliteDefineCustomElements } from 'jeep-sqlite/loader';
import { defineCustomElements as ionicPwaElementsDefineCustomElements } from '@ionic/pwa-elements/loader';

import { environment } from './environments/environment.prod';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

// Iniciar custom elements
jeepSqliteDefineCustomElements(window);
ionicPwaElementsDefineCustomElements(window);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});