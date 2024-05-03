import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profesor-edit',
  templateUrl: './profesor-edit.page.html',
  styleUrls: ['./profesor-edit.page.scss'],
})
export class ProfesorEditPage implements OnInit {

  profesor : any = [];
  id: any;
  isNew: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private readonly firestore: Firestore,
    private router: Router
  ) { }


  ngOnInit() {
    this.route.params.subscribe((params:any)=>{
      console.log('params',params);
      this.id = params.id;

      if(params.id=='new'){
        this.isNew=true;
      }else{
        this.obtenerProfesor(this.id);
      }
    });
  }

  editarProfesor = () =>{
    const document = doc(this.firestore, "profesor", this.id);
    updateDoc(document,{
      codigo : this.profesor.codigo,
      nombre : this.profesor.nombre,
      apellido : this.profesor.apellido,
      telefono : this.profesor.telefono,
      activo : this.profesor.activo,
    }).then(() => {
      console.log("Fue Modificado con Éxito!!");
      this.router.navigate(['/profesor-list']);
    }).catch(error => {
      console.error("Error al editar profesor:", error);
    });
  }

  guardarProfesor(){
    if (this.isNew) {
      this.incluirProfesor();
    } else {
      this.editarProfesor();
    }
  }

  incluirProfesor = () =>{ 
    let profesorRef = collection(this.firestore, "profesor");

    addDoc(profesorRef,{
      codigo : this.profesor.codigo,
      nombre : this.profesor.nombre,
      apellido : this.profesor.apellido,
      telefono : this.profesor.telefono,
      activo : this.profesor.activo,
    }).then(() => {
      console.log("Fue Registrado con Éxito!!");
      this.router.navigate(['/profesor-list']);
    }).catch(error => {
      console.error("Error al editar profesor:", error);
    });
  }

  obtenerProfesor = async (id: string) => {
    const document = doc(this.firestore, "profesor", id);
    getDoc(document).then(doc =>{
      console.log("Registro a editar", doc.data());
      this.profesor = doc.data();
    })
  }

  eliminarProfesor = () => {
    const alert = document.querySelector('ion-alert');
    if (alert !== null) {
      alert.present();
    }
  }
  

  dismissed(ev: any) {
    if (ev.detail.role === 'confirm') {
      const document = doc(this.firestore, "profesor", this.id);
      deleteDoc(document).then(doc => {
        console.log("Registro Eliminado");
        this.router.navigate(['/profesor-list']);
      }).catch(error => {
        console.error("Error al eliminar el registro:", error);
      });
    }
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  setResult(ev:any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

}

  