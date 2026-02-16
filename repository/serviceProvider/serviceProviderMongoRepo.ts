import { ServiceProvider } from "../../models/serviceProviderModel.js";
import type { baseServiceProvider } from "./baseServiceProvider.js";
import { serviceproviderGeneralMethodsClass } from "./serviceProviderGeneralMethods.js";

class serviceProviderMongoRepoClass extends serviceproviderGeneralMethodsClass{
    async create (data : baseServiceProvider) : Promise<baseServiceProvider> {
        const serviceprovider = new ServiceProvider(data);

        await serviceprovider.save();

        return serviceprovider;
    }

    async get (id : string) : Promise<baseServiceProvider> {
        const serviceprovider = await ServiceProvider.findById(id);
        return serviceprovider ?? <baseServiceProvider>{};
    }

    async getAll () : Promise<baseServiceProvider[]> {
        const serviceproviders = await ServiceProvider.find();

        return serviceproviders;
    }

    async delete (id : string) : Promise <baseServiceProvider> {
        const serviceprovider = await ServiceProvider.findByIdAndDelete(id);

        return serviceprovider ?? <baseServiceProvider>{}
    }
}

export { serviceProviderMongoRepoClass }