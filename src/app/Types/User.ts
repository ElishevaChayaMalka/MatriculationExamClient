export class User{
     id?:string ;
     className?:string;
     classNameNumber?: string;
    

    constructor(id?: string, className?: string, classNameNumber?: string) {
        this.id = id;
        this.className = className;
        this.classNameNumber = classNameNumber;
    }
}
