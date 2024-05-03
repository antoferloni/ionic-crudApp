import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profesor-list',
  templateUrl: './profesor-list.page.html',
  styleUrls: ['./profesor-list.page.scss'],
})
export class ProfesorListPage implements OnInit {

  constructor(
    private readonly firestore: Firestore,
    private router: Router,
    private alertController: AlertController
  ) { }

  listaProfesor = new Array();

  ngOnInit() {
    this.listarProfesor();
  }

  listarProfesor = () =>{
    console.log("Listar Profesores");
    const profesorRef = collection(this.firestore, 'profesor');
    collectionData(profesorRef, {idField:'id'}).subscribe(respuesta=>{
      console.log("estos son los datos ", respuesta);
      this.listaProfesor=respuesta;
    })
  }

}
