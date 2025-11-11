export class Utilisateur {
  constructor(
    public id: number, 
    public nom: string,
    public prenom: string,
    public email: string,
    public role: 'admin' | 'utilisateur',
    public date_creation?: Date 
  ) {}
}
