import { Component,OnInit, TemplateRef, ViewChild   } from '@angular/core';
import { Model } from './model';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { Gastos_Response } from './gastos_response';
import { GastosService } from './service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements  OnInit   {
  elementos: any[] | undefined;
  list : Gastos_Response[] = [];
  listMes: any[] = [];
  elemento: Model = new Model();
  id: string = "";  
  isTrx: boolean = true;
  @ViewChild('modalTemplate')
  modalTemplate!: TemplateRef<any>;
  displayedColumns: string[] = ['acciones', 'mes', 'semana', 'tipo', 'valor', 'varios', 'total', 'datoAdicional'];
  displayedColumnsMes: string[] = ['mes', 'total'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  mostrarCard: boolean = false;

  constructor(private dialog: MatDialog, private _serivice: GastosService) {}
  
  ngOnInit () {    
    this.search();
  }
  
  search(){
    this._serivice.getUsuarios().subscribe((res:any)=>{
      this.list = res.map((data: any) => {
        data.total = data.valor + data.varios;        
        return data;
      });
    });
    console.log(this.list);   
  }

  calculoMensual(){
    this.mostrarCard = !this.mostrarCard;
    this._serivice.getUsuarios().subscribe((res: any) => {
      const totalesPorMes: { [mes: number]: number } = {};
      res.forEach((data: any) => {
        const mes = data.mes;
        const total = data.valor + data.varios;
        
        if (totalesPorMes[mes]) {
          totalesPorMes[mes] += total;
        } else {
          totalesPorMes[mes] = total;
        }
      });

      this.listMes = Object.keys(totalesPorMes).map((mes: string) => ({
        mes: parseInt(mes),
        total: totalesPorMes[parseInt(mes)]
      }));     
    });    
  }

  btnAdd() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1;
    if(this.isTrx){
      this.elemento.mes= mesActual;
      console.log(this.elemento);  
      this._serivice.crearUsuario(this.elemento).subscribe(res=>{console.log(res);});
    }else{      
      this.elemento.mes= mesActual;  
      this._serivice.actualizarUsuario(this.elemento).subscribe(res=>{console.log(res);});
    }
    this.dialog.closeAll();
    this.search();
  }

  btnEdit(elemento: Model, id: string) {
    this.elemento = elemento;
    this.id = id;
    this.isTrx = false;
    this.btnOpenModal();
  }
  
  btnDelete(id: string) {    
    this._serivice.borrarUsuario(id).subscribe();
  }

  btnOpenModal() {
    const dialogRef = this.dialog.open(this.modalTemplate, {
      width: '350px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }

  btnCloseModal(): void {
    this.dialog.closeAll();
  }
}
