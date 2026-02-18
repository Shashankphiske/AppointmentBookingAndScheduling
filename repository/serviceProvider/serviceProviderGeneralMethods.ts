import type { baseServiceProvider } from "./baseServiceProvider.js";

abstract class serviceproviderGeneralMethodsClass {
    abstract create (data : baseServiceProvider) : Promise<baseServiceProvider>;
    abstract get (id : string) : Promise<baseServiceProvider>;
    abstract getAll () : Promise<baseServiceProvider[]>;
    abstract delete (id : string) : Promise <baseServiceProvider>;
    abstract getByEmail ( email : string ) : Promise<baseServiceProvider>;
    abstract update (data : baseServiceProvider) : Promise<baseServiceProvider>;
}

export { serviceproviderGeneralMethodsClass };