import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false; 
  public usuario: Usuario = null;
  constructor(
    private socket: Socket
  ) {
    this.cargarStorage();
    this.checkStatus();
   }

  checkStatus(){

    this.socket.on('connect',()=>{
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect',()=>{
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    })

  }

  emit(evento: string, payload?: any, callback?: Function){

    console.log('Emitiento evento',evento)
    this.socket.emit(evento, payload, callback);

  }
  listen(evento: string){

    return this.socket.fromEvent(evento)

  }

  loginWS(nombre: string){
    return new Promise<void>((resolve,reject)=>{
      this.emit('configurar-usuario',{nombre},resp=>{

        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      })
    })
    
  }

  guardarStorage(){

    localStorage.setItem('usuario',JSON.stringify(this.usuario));

  }
  cargarStorage(){
    
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'))
      this.loginWS(this.usuario.nombre);
    }

  }
  getUsuario(){
    return this.usuario
  }
}
