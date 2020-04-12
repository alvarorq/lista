import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList, {static: true} ) lista: IonList;
  @Input() terminada = true;

  constructor(public tareasServices: TareasService,
              private router:Router,
              private alertController: AlertController
              ) { }

  ngOnInit() {}

  
  listaSeleccionada(lista:Lista){
    if(this.terminada) this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    else this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  }

  borrarLista(lista:Lista){
    this.tareasServices.borrarLista(lista);
  }

  async editarLista(lista:Lista){
    const alert = await this.alertController.create({
      header: 'Editar título',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Título de la lista',
        }
      ],
      buttons: [
        {
          text:'Cancelar',
          role:'cancel',
          handler:() => {
            this.lista.closeSlidingItems();
          }          
        },
        {
          text: 'Editar',
          handler: (data)=>{
            if(data.titulo.length == 0){
              return ;
            }

            lista.titulo = data.titulo;
            this.tareasServices.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }
}
