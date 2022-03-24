import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService : WebsocketService
  ) { }
  sendMessage(mensaje: string){
    const payload = {
      de: this.wsService.getUsuario().nombre,
      cuerpo: mensaje
    }
    this.wsService.emit('mensaje',payload);
  }
  getMessages(){
    return this.wsService.listen('mensaje-nuevo');
  }
  getMessagesPrivate(){
    return this.wsService.listen('mensaje-privado');
  }
  getUsuariosActivos(){
    return this.wsService.listen('usuarios-activos')
  }
  emitUsersActivate(){
    return this.wsService.emit('lista-usuario');
  }
}
