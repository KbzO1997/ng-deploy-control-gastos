export class Gastos_Response {
    
    semana: number;
    tipo: string;
    valor: number;
    varios: number;
    mes: string;
    datoAdicional: string;

    constructor() {
      this.semana=0;
      this.tipo="";
      this.valor = 0;
      this.varios=0;
      this.mes="";
      this.datoAdicional = "";
    }
    
}