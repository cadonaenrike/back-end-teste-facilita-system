export class Tarefa {
  private _codigo: number;
  private _idUser: number;
  private _tarefa: string;

  constructor(idUser: number, tarefa: string) {
    this._codigo = 0;
    this._idUser = idUser;
    this._tarefa = tarefa;
  }

  public get codigo(): number {
    return this._codigo;
  }

  public get idUser(): number {
    return this._idUser;
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
      idUser: this._idUser,
      tarefa: this._tarefa,
    };
  }
}
