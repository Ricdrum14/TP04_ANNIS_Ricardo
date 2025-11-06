export class Pollution{
    id: string;
    constructor(
        public titre: string,
        public type: string,
        public description: string,
        public date: Date,
        public lieu: string,
        public latitude: string,
        public longitude: string,
        public photo: string,
        id?: string
    ){
        // Gestion de l'ID MongoDB
        this.id = id || '';
    }
}