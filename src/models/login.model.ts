export class Login {
  private _nome: string;
  private _senha: string;

  constructor(nome: string, senha: string) {
    this._nome = nome;
    this._senha = senha;
  }

  public get nome(): string {
    return this._nome;
  }

  public get senha(): string {
    return this._senha;
  }

  public toJson() {
    return {
      nome: this._nome,
      senha: this._senha,
    };
  }
}
