import { Component } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public tareasServices:TareasService,
              private router: Router,
              private alertController: AlertController) {
              
  } 

  async agregarLista(){

    const alert = await this.alertController.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista',
        }
      ],
      buttons: [
        {
          text:'Cancelar',
          role:'cancel',          
        },
        {
          text: 'Crear',
          handler: (data)=>{
            if(data.titulo.length == 0){
              return ;
            }

            const listaId = this.tareasServices.crearLista(data.titulo);

            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);

          }
        }
      ]
    });

    alert.present();
    //this.router.navigateByUrl('/tabs/tab1/agregar')
  }

}
