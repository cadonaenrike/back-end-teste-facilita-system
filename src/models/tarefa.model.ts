export class Tarefa {
  private _codigo: number;
  private _tarefa: string;

  constructor(tarefa: string) {
    this._codigo = 0;
    this._tarefa = tarefa;
  }

  public get codigo(): number {
    return this._codigo;
  }

  public get tarefa(): string {
    return this._tarefa;
  }

  public set codigo(value: number) {
    this._codigo = value;
  }

  public toJson() {
    return {
      codigo: this._codigo,
      tarefa: this._tarefa,
    };
  }
}
