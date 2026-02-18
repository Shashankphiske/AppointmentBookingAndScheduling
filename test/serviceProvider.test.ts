import { serviceProviderServiceClass } from "../service/serviceProviderServiceClass";
import { authUtil } from "../factory/authFactory";
import { email, logActivity } from "../factory/utilFactory";
import { serverError } from "../utils/errorUtil";

jest.mock("../factory/authFactory", () => ({
  authUtil: {
    hashPass: jest.fn(),
    generateToken: jest.fn(),
  },
}));

jest.mock("../factory/utilFactory", () => ({
  email: {
    send: jest.fn(),
  },
  logActivity: {
    log: jest.fn(),
  },
}));

describe("serviceProviderServiceClass", () => {
  let serviceProviderMethodsMock: any;
  let serviceProviderService: serviceProviderServiceClass;

  beforeEach(() => {
    serviceProviderMethodsMock = {
      getByEmail: jest.fn(),
      create: jest.fn(),
      get: jest.fn(),
      getAll: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    serviceProviderService = new serviceProviderServiceClass(
      serviceProviderMethodsMock
    );

    jest.clearAllMocks();
  });

  // =========================
  // CREATE SERVICE PROVIDER
  // =========================

  it("should create service provider successfully", async () => {
    const data = {
      email: "sp@mail.com",
      password: "12345678",
    };

    const createdSP = {
      _id: "sp123",
      email: "sp@mail.com",
    };

    serviceProviderMethodsMock.getByEmail.mockResolvedValue({});
    (authUtil.hashPass as jest.Mock).mockResolvedValue("hashedPass");
    serviceProviderMethodsMock.create.mockResolvedValue(createdSP);
    (authUtil.generateToken as jest.Mock).mockReturnValue("token123");

    const result = await serviceProviderService.createServiceProvider(
      data as any
    );

    expect(authUtil.hashPass).toHaveBeenCalledWith("12345678");
    expect(serviceProviderMethodsMock.create).toHaveBeenCalled();
    expect(authUtil.generateToken).toHaveBeenCalledWith(
      "sp123",
      "serviceProvider"
    );
    expect(email.send).toHaveBeenCalledWith("sp@mail.com", "Welcome !");
    expect(logActivity.log).toHaveBeenCalledWith(
      "New Service Provider Created"
    );

    expect(result).toEqual({
      serviceProvider: createdSP,
      token: "token123",
    });
  });

  it("should throw error if email already exists", async () => {
    serviceProviderMethodsMock.getByEmail.mockResolvedValue({
      email: "sp@mail.com",
    });

    await expect(
      serviceProviderService.createServiceProvider({
        email: "sp@mail.com",
      } as any)
    ).rejects.toThrow(
      "Service Provider with the specified email already exists"
    );
  });

  it("should throw error if create fails", async () => {
    serviceProviderMethodsMock.getByEmail.mockResolvedValue({});
    (authUtil.hashPass as jest.Mock).mockResolvedValue("hashedPass");
    serviceProviderMethodsMock.create.mockResolvedValue(null);

    await expect(
      serviceProviderService.createServiceProvider({
        email: "sp@mail.com",
        password: "123",
      } as any)
    ).rejects.toThrow(
      "Error while creating a service provider"
    );
  });

  // =========================
  // GET SERVICE PROVIDER
  // =========================

  it("should return service provider by id", async () => {
    const sp = { email: "sp@mail.com" };

    serviceProviderMethodsMock.get.mockResolvedValue(sp);

    const result = await serviceProviderService.getServiceProvider("123");

    expect(result).toEqual(sp);
    expect(logActivity.log).toHaveBeenCalledWith(
      "Service Provider Fetched"
    );
  });

  it("should throw error if service provider not found by id", async () => {
    serviceProviderMethodsMock.get.mockResolvedValue({});

    await expect(
      serviceProviderService.getServiceProvider("123")
    ).rejects.toThrow(
      "No service provider found with the id : 123"
    );
  });

  // =========================
  // GET ALL SERVICE PROVIDERS
  // =========================

  it("should return all service providers", async () => {
    const sps = [{ email: "a@mail.com" }];

    serviceProviderMethodsMock.getAll.mockResolvedValue(sps);

    const result = await serviceProviderService.getAllServiceProviders();

    expect(result).toEqual(sps);
    expect(logActivity.log).toHaveBeenCalledWith(
      "All Service Providers Fetched"
    );
  });

  it("should throw error if no service providers found", async () => {
    serviceProviderMethodsMock.getAll.mockResolvedValue([]);

    await expect(
      serviceProviderService.getAllServiceProviders()
    ).rejects.toThrow("No service providers found");
  });

  // =========================
  // DELETE SERVICE PROVIDER
  // =========================

  it("should delete service provider successfully", async () => {
    const sp = { email: "sp@mail.com" };

    serviceProviderMethodsMock.delete.mockResolvedValue(sp);

    const result = await serviceProviderService.deleteServiceProvider("123");

    expect(email.send).toHaveBeenCalledWith(
      "sp@mail.com",
      "Your account has been deleted"
    );
    expect(logActivity.log).toHaveBeenCalledWith(
      "Service Provider Deleted"
    );
    expect(result).toEqual(sp);
  });

  it("should throw error if delete fails", async () => {
    serviceProviderMethodsMock.delete.mockResolvedValue({});

    await expect(
      serviceProviderService.deleteServiceProvider("123")
    ).rejects.toThrow(
      "No service provider found with the id : 123"
    );
  });

  // =========================
  // GET BY EMAIL
  // =========================

  it("should return service provider by email", async () => {
    const sp = { email: "sp@mail.com" };

    serviceProviderMethodsMock.getByEmail.mockResolvedValue(sp);

    const result = await serviceProviderService.getByEmail("sp@mail.com");

    expect(result).toEqual(sp);
    expect(logActivity.log).toHaveBeenCalledWith(
      "Service provider fetched using email"
    );
  });

  it("should throw error if email not found", async () => {
    serviceProviderMethodsMock.getByEmail.mockResolvedValue({});

    await expect(
      serviceProviderService.getByEmail("missing@mail.com")
    ).rejects.toThrow(
      "Service provider with the specified email does not exist"
    );
  });

  // =========================
  // UPDATE
  // =========================

  it("should update service provider successfully", async () => {
    const updated = { _id: "123", email: "sp@mail.com" };

    serviceProviderMethodsMock.update.mockResolvedValue(updated);

    const result = await serviceProviderService.update(updated as any);

    expect(logActivity.log).toHaveBeenCalledWith(
      "data updated for service provider"
    );
    expect(result).toEqual(updated);
  });

  it("should throw error if update fails", async () => {
    serviceProviderMethodsMock.update.mockResolvedValue({});

    await expect(
      serviceProviderService.update({} as any)
    ).rejects.toThrow("Service Provider not found");
  });
});
