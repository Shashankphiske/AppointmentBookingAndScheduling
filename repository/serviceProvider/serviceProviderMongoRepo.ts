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

    async getByEmail(email: string): Promise<baseServiceProvider> {
        const serviceprovider = await ServiceProvider.findOne({ email : email });
        return serviceprovider ?? <baseServiceProvider>{};
    }

    async update (data : baseServiceProvider) : Promise<baseServiceProvider> {
        const serviceP = await ServiceProvider.findOne({ email : data.email });
        if(!serviceP?._id) return <baseServiceProvider>{};
        if(data.passFlag){
            serviceP.password = data.password || serviceP?.password;
        }else{
            serviceP.name = data.name || serviceP.name;
            serviceP.phonenumber = data.phonenumber || serviceP.phonenumber;
            serviceP.serviceName = data.serviceName || serviceP.serviceName;
            serviceP.duration = data.duration || serviceP.duration;
            serviceP.price = data.price || serviceP.price;
            serviceP.description = data.description || serviceP.description;
        }

        await serviceP.save();
        return serviceP;
    } 
}

export { serviceProviderMongoRepoClass }