export class TarefaDto {
  codigo: number;
  idUser: number;
  tarefa: string;

  constructor(codigo: number, idUser: number, tarefa: string) {
    this.codigo = codigo;
    this.idUser = idUser;
    this.tarefa = tarefa;
  }

  public toJson() {
    return {
      codigo: this.codigo,
      idUser: this.idUser,
      tarefa: this.tarefa,
    };
  }
}
