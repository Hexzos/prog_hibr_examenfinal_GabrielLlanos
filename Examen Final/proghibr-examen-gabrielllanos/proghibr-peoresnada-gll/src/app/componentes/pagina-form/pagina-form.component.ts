import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonCard, IonCardContent, IonItem, IonInput, IonLabel, IonButton, IonText, IonIcon, IonList, IonToast, IonThumbnail, IonTextarea } from "@ionic/angular/standalone";
import { Publicaciones } from 'src/app/modelo/publicaciones';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { camera, cameraOutline, image } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-pagina-form',
  templateUrl: './pagina-form.component.html',
  styleUrls: ['./pagina-form.component.scss'],
  standalone: true,
  imports: [IonTextarea, IonThumbnail, IonToast, IonList,  IonIcon, IonText, IonButton, IonLabel, IonInput, IonItem, IonCardContent, IonCard, CommonModule, FormsModule]
})
export class PaginaFormComponent implements OnInit {
  tituloStr: string = "";
  imagen: string | null = null;
  fechaStr: string = "";
  descripcionStr: string = "";
  

  publicaciones: Publicaciones[] = [];

  @Output() onCreate = new EventEmitter<{ titulo: string, imagen: string, fecha: string, descripcion: string }>();
  isToastOpen: boolean = false;

  constructor() {
    addIcons({ cameraOutline, camera, image });
  }

  ngOnInit() {}

  

  async tomarFoto(source: string) {
    const cameraSource = source === 'camera' ? CameraSource.Camera : CameraSource.Photos;
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: cameraSource 
    });

    if (image.dataUrl) {
        this.imagen = image.dataUrl;
    } else {
        console.error('Error al capturar la imagen');
    }
}


  
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagen = file as string;
    } else {
      this.imagen = null;
    }
  }

  async onClick() { const nuevaPublicacion: Publicaciones = { 
    titulo: this.tituloStr, 
    imagen: this.imagen as string, 
    fecha: new Date().toISOString(), 
    descripcion: this.descripcionStr }; 
    this.onCreate.emit(nuevaPublicacion);
    this.tituloStr = ''; 
    this.descripcionStr = ''; 
    this.imagen = null 
    this.mostrarToast(); }

  mostrarToast() { 
    this.isToastOpen = true; 
    setTimeout(() => { this.isToastOpen = false; }, 2000); 
  }
}
