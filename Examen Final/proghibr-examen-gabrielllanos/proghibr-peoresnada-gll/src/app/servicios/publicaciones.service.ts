import { Injectable } from '@angular/core';
import { Publicaciones } from '../modelo/publicaciones';
import { Capacitor} from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})

export class PublicacionesService {

  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  platform: string = "";

  DB_NAME: string = "PublicacionesDB";
  TABLE_NAME: string = "PublicacionesDB";
  COL_TITULO: string = "titulo";
  COL_IMAGEN: string = "imagen";
  COL_FECHA: string = "fecha";
  COL_DESCRIPCION: string = "descripcion";
  DB_ENCRIPTADA: boolean = false;
  DB_MODE: string = "no-encryption";
  DB_VERSION: number = 1;
  DB_READ_ONLY: boolean = false;

  DB_SQL_TABLAS: string = `CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ${this.COL_TITULO} TEXT NOT NULL,
    ${this.COL_IMAGEN} TEXT NOT NULL,
    ${this.COL_FECHA} TEXT NOT NULL,
    ${this.COL_DESCRIPCION} TEXT NOT NULL  
    ); `;

    db!: SQLiteDBConnection;

  constructor() { 
    this.iniciarPlugin().then(() => {
      console.log("Plugin iniciado");
    }).catch(error => {
      console.log("Error al iniciar el plugin", error);
    });

  }


  private async _iniciarPluginWeb(): Promise<void> {
    await customElements.whenDefined('jeep-sqlite');
    const jeepSqliteEl = document.querySelector('jeep-sqlite');
    if (jeepSqliteEl != null) {
      await this.sqlite.initWebStore();
    }
  }

  async iniciarPlugin() {
    this.platform = Capacitor.getPlatform();
    if (this.platform === 'web') {
      await this._iniciarPluginWeb();
    }
    await this.abrirConexion();
    await this.db.execute(this.DB_SQL_TABLAS);
  }


  async abrirConexion() {
    const ret = await this.sqlite.checkConnectionsConsistency();
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result;
    if (ret.result && isConn) {
     this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY);
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME, 
        this.DB_ENCRIPTADA, 
        this.DB_MODE,
        this.DB_VERSION, 
        this.DB_READ_ONLY, 
       
      );
    }
    await this.db.open();
  }

    async agregarPublicacion(p: Publicaciones) {
      if (!this.db) {
        console.error('Base de datos no inicializada')
        return;
    }

    if (!p.imagen) { 
      p.imagen = 'https://ionicframework.com/docs/img/demos/thumbnail.svg'; 
    }


    const sql = `INSERT INTO 
      ${this.TABLE_NAME} 
      (${this.COL_TITULO}, 
      ${this.COL_IMAGEN}, 
      ${this.COL_FECHA}, 
      ${this.COL_DESCRIPCION}) 
      VALUES (?, ?, ?, ?)`;
    try {
      await this.db.run(sql, [p.titulo, p.imagen, p.fecha, p.descripcion]);
    } catch (error) {
      console.error('Error al agregar publicacion', error);
    }

    }

    async getPublicaciones(): Promise<Publicaciones[]> {
      if (!this.db) {
        console.error('Base de datos no inicializada')
        return [];
      }
      const sql = `SELECT * FROM ${this.TABLE_NAME}`;
      try {
        const resultado = await this.db.query(sql);
        return resultado?.values ?? []; }
        catch (error) {
          console.error('Error al obtener publicaciones', error);
          return [];
        }
     }

     async eliminarPublicacion(p: Publicaciones) {
      if (!this.db) {
        console.error('Base de datos no inicializada')
        return;
      }
      const sql = `DELETE FROM ${this.TABLE_NAME} WHERE id = ?`;
      try {
        await this.db.run(sql, [p.id]);
      } catch (error) {
        console.error('Error al eliminar publicacion', error);
      }

    } 


  }
