export class Model {
    semana: number;
    tipo: string;
    valor: number;
    varios: number;
    id?: string;
    total: number;
    mes: number;
    datoAdicional: string;
    constructor() {
      this.semana=0;
      this.tipo="";
      this.valor = 0;
      this.varios=0;
      this.total=0
      this.mes=0;
      this.datoAdicional= "";
    }
    
    toJSON() {
      return {
        semana: this.semana,
        tipo: this.tipo,
        valor: this.valor,
        varios: this.varios,
        id: this.id,
        mes: this.mes,
        datoAdicional: this.datoAdicional
      };
    }
}