import { ServiceProvider } from "../../models/serviceProviderModel";
import type { baseServiceProvider } from "./baseServiceProvider";
import { serviceproviderGeneralMethodsClass } from "./serviceProviderGeneralMethods";

class serviceProviderMongoRepoClass extends serviceproviderGeneralMethodsClass{

    private updatePassword(serviceP: any, data: any) {
        if (data.password) {
            serviceP.password = data.password;
        }
    }

    private updateBasicDetails(serviceP: any, data: any) {
        serviceP.name = data.name ?? serviceP.name;
        serviceP.phonenumber = data.phonenumber ?? serviceP.phonenumber;
        serviceP.serviceName = data.serviceName ?? serviceP.serviceName; 
        serviceP.price = data.price ?? serviceP.price;
        serviceP.description = data.description ?? serviceP.description;
    }

    private updateAvailability(serviceP: any, availability: any) {
        if (!availability) return;

        serviceP.availability.duration =
            availability.duration ?? serviceP.availability.duration;

        serviceP.availability.startTime =
            availability.startTime ?? serviceP.availability.startTime;

        serviceP.availability.endTime =
            availability.endTime ?? serviceP.availability.endTime;

        serviceP.availability.workingDays =
            availability.workingDays ?? serviceP.availability.workingDays;
    }


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
        if (data.passFlag) {
            this.updatePassword(serviceP, data);
        } else {
            this.updateBasicDetails(serviceP, data);
            this.updateAvailability(serviceP, data.availability);
        }
        await serviceP.save();
        return serviceP;
    } 
}

export { serviceProviderMongoRepoClass }