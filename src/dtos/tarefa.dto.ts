export class TarefaDto {
  codigo: number;
  tarefa: string;

  constructor(codigo: number, tarefa: string) {
    this.codigo = codigo;
    this.tarefa = tarefa;
  }

  public toJson() {
    return {
      codigo: this.codigo,
      tarefa: this.tarefa,
    };
  }
}
