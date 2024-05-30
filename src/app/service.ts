import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';
import { Model } from './model';

//https://usuario-proy-default-rtdb.firebaseio.com
//const URL= environment.urlServer
const URL= "https://motorclave-f8d86-default-rtdb.firebaseio.com";

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  constructor(private http:HttpClient) { }

crearUsuario(usuario:Model){
console.log(usuario);
//this.http.post(`${URL}/elementos.json`, usuario );
  return this.http.post(`${URL}/elementos.json`, usuario ).pipe(
    map((res:any)=>{
      usuario.id = res.name;
      return usuario;
    })
  )

}  

actualizarUsuario(model:Model){

  const usuarioTemp={
    ...model    
  }

  delete usuarioTemp.id;

  return this.http.put(`${URL}/elementos/${model.id}.json`, usuarioTemp); 

}

getUsuarios(){
  return this.http.get(`${URL}/elementos.json`).pipe(
    map(this.arreglo)
  )
}

getUsuario(id:string){

  return this.http.get(`${URL}/elementos/${id}.json`);

}

private arreglo(modelsObj:any){

  const models:Model[]=[];
  if (modelsObj === null) {
    return null;
  }

  for(let registro in modelsObj){

    modelsObj[registro].id = registro;
    models.push(modelsObj[registro]);

  }
  console.log(models);
  return models;

}

borrarUsuario(id:any){
  return this.http.delete(`${URL}/elementos/${id}.json`);
}

}