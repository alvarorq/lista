import { Component, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaTareas } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor(private tareasService:TareasService,
              private router: ActivatedRoute) { 

    const listaId = this.router.snapshot.paramMap.get('listaId');
    this.lista = this.tareasService.obtenerLista(listaId);
  }

  ngOnInit() {
  }

  agregarItem(){
    if(this.nombreItem.length === 0){
      return;
    }

    const nuevoItem = new ListaTareas( this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = '';
    this.tareasService.guardarStorage();
  }

  cambioCheck(item: ListaTareas){

    const pendientes = this.lista.items.filter(x=> !x.completado ).length;

    if(pendientes == 0 ){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.tareasService.guardarStorage();

  }

  eliminar(index:number){
    this.lista.items.splice(index, 1);
    this.tareasService.guardarStorage();
  }
}
