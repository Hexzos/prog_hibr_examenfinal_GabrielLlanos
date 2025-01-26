import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IonList, IonItem, IonLabel, IonText, IonThumbnail, IonButton, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonImg, IonGrid, IonCol, IonRow, IonToast } from "@ionic/angular/standalone";
import { Publicaciones } from 'src/app/modelo/publicaciones';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagina-list',
  templateUrl: './pagina-list.component.html',
  styleUrls: ['./pagina-list.component.scss'],
  standalone: true,
  imports: [IonToast, IonRow, IonCol, IonGrid, IonImg, IonContent, IonButtons, IonTitle, IonToolbar, IonHeader, IonModal, IonIcon, CommonModule, IonButton, IonText, IonLabel, IonItem, IonList, IonThumbnail],
})
export class PaginaListComponent implements OnInit {

  isModalEliminarOpen = false;
  isDetalleModalOpen = false;
  isToastDeletedOpen: boolean = false;

  publicacionSeleccionada: Publicaciones | null = null;

  @Input() publicaciones: Publicaciones[] = [];
  @Output() onDelete = new EventEmitter<Publicaciones>();

  constructor() { }

  ngOnInit() {}

  setOpenEliminar(isOpen: boolean, publicacion?: Publicaciones) {
    this.isModalEliminarOpen = isOpen;
    if (isOpen && publicacion) {
      this.publicacionSeleccionada = publicacion;
    } else {
      this.publicacionSeleccionada = null;
    }
  }

  setOpenDetalle(isOpen: boolean, publicacion?: Publicaciones) {
    this.isDetalleModalOpen = isOpen;
    if (isOpen && publicacion) {
      this.publicacionSeleccionada = publicacion;
    } else {
      this.publicacionSeleccionada = null;
    }
  }

  onClickDetalle(publicacion: Publicaciones) {
    this.setOpenDetalle(true, publicacion);
  }

  onClickEliminar(publicacion: Publicaciones) {
    this.onDelete.emit(publicacion);
    this.setOpenEliminar(false);
    this.mostrarToast();
  }

  mostrarToast() { 
    this.isToastDeletedOpen = true; 
    setTimeout(() => { this.isToastDeletedOpen = false; }, 2000); 
  }
}
