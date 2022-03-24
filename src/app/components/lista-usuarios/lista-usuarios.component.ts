import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WebsocketService } from 'src/app/services/websocket.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuariosActivosObs: Observable<any>;
  constructor(
    public chatService: ChatService
    //public wsService : WebsocketService
  ) { }

  ngOnInit(): void {
    
    this.usuariosActivosObs = this.chatService.getUsuariosActivos();
    this.chatService.emitUsersActivate();
   /*  this.wsService.emit('lista-usuario');
    console.log('Hola');
    this.usuariosActivosObs = this.wsService.listen('usuarios-activos'); */

  }

}
