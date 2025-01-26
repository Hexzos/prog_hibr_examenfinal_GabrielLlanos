import { Component, OnInit } from '@angular/core';
import { PaginaListComponent } from 'src/app/componentes/pagina-list/pagina-list.component';
import { Publicaciones } from 'src/app/modelo/publicaciones';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';
import { CommonModule } from '@angular/common';
import { IonHeader, IonContent, IonToolbar, IonTitle, IonIcon, IonFab, IonFabButton } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { settingsOutline, trashOutline, add } from 'ionicons/icons';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, IonIcon, IonTitle, IonToolbar, IonContent, IonHeader, CommonModule, FormsModule, PaginaListComponent, RouterModule]
})
export class InicioPage implements OnInit {

  
    listaPublicaciones: Publicaciones[] = [];
  
    constructor(
      private publicacionService: PublicacionesService
    ) { 

      addIcons({
        settingsOutline,
        trashOutline,
        add,
      });

    }
  
    async ngOnInit() {
      await this.publicacionService.iniciarPlugin();
      await this._mostrar();
    }

    async ionViewWillEnter() {
      await this._mostrar();
    }
  
    async _mostrar() {
      this.listaPublicaciones = await this.publicacionService.getPublicaciones();
    }
  
  
    async eliminarPublicaciones (publicacion: Publicaciones) {
      await this.publicacionService.eliminarPublicacion(publicacion);
      await this._mostrar();
    }
  

}
