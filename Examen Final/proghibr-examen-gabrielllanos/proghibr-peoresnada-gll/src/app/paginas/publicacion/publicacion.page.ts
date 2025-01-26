import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { PaginaFormComponent } from 'src/app/componentes/pagina-form/pagina-form.component';
import { Publicaciones } from 'src/app/modelo/publicaciones';
import { PublicacionesService } from 'src/app/servicios/publicaciones.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, PaginaFormComponent]
})
export class PublicacionPage implements OnInit {

  listaPublicaciones: Publicaciones[] = [];
  

  constructor(
    private publicacionService: PublicacionesService
  ) { }

  async ngOnInit() {
    await this.publicacionService.iniciarPlugin();
    await this._mostrar();
  }
  async _mostrar() {
    this.listaPublicaciones = await this.publicacionService.getPublicaciones();
  }

   async crearPublicaciones ($event: {titulo: string, imagen: string, fecha: string, descripcion: string}) {
        const publicacion: Publicaciones = {id: 0, ...$event};
        await this.publicacionService.agregarPublicacion(publicacion);
        await this._mostrar();
      }

}
