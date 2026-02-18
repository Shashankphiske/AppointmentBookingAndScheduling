import { appointmentServiceClass } from "../service/appointmentServiceClass";
import { email, logActivity } from "../factory/utilFactory";
import { serverError } from "../utils/errorUtil";

jest.mock("../factory/utilFactory", () => ({
  email: {
    sendAppointment: jest.fn(),
    sendUpdatedAppointment: jest.fn(),
    sendDeletedAppointment: jest.fn(),
  },
  logActivity: {
    log: jest.fn(),
  },
}));

describe("appointmentServiceClass", () => {
  let appointmentMethodsMock: any;
  let userMethodsMock: any;
  let servicePMethodsMock: any;
  let appointmentService: appointmentServiceClass;

  beforeEach(() => {
    appointmentMethodsMock = {
      create: jest.fn(),
      get: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    userMethodsMock = {
      get: jest.fn(),
      getByEmail: jest.fn(),
    };

    servicePMethodsMock = {
      get: jest.fn(),
      getByEmail: jest.fn(),
    };

    appointmentService = new appointmentServiceClass(
      appointmentMethodsMock,
      userMethodsMock,
      servicePMethodsMock
    );

    jest.clearAllMocks();
  });

  // =========================
  // CREATE APPOINTMENT
  // =========================

  it("should create appointment successfully", async () => {
    const data = {
      userEmail: "user@mail.com",
      serviceProviderEmail: "sp@mail.com",
    };

    userMethodsMock.getByEmail.mockResolvedValue({ email: "user@mail.com" });
    servicePMethodsMock.getByEmail.mockResolvedValue({ email: "sp@mail.com" });

    const created = { ...data, _id: "a1" };
    appointmentMethodsMock.create.mockResolvedValue(created);

    const result = await appointmentService.createAppointment(data as any);

    expect(email.sendAppointment).toHaveBeenCalled();
    expect(logActivity.log).toHaveBeenCalledWith("New Appointment Created");
    expect(result).toEqual(created);
  });

  it("should throw if appointment creation fails", async () => {
    userMethodsMock.getByEmail.mockResolvedValue({ email: "user@mail.com" });
    servicePMethodsMock.getByEmail.mockResolvedValue({ email: "sp@mail.com" });
    appointmentMethodsMock.create.mockResolvedValue(null);

    await expect(
      appointmentService.createAppointment({
        userEmail: "user@mail.com",
        serviceProviderEmail: "sp@mail.com",
      } as any)
    ).rejects.toThrow("Error while creating an appointment");
  });

  // =========================
  // GET APPOINTMENT
  // =========================

  it("should fetch appointment for user", async () => {
    const appointment = {
      _id: "a1",
      userEmail: "user@mail.com",
      serviceProviderEmail: "sp@mail.com",
    };

    appointmentMethodsMock.get.mockResolvedValue(appointment);
    userMethodsMock.get.mockResolvedValue({ email: "user@mail.com" });

    const result = await appointmentService.getAppointment(
      "a1",
      "u1",
      "user"
    );

    expect(result).toEqual(appointment);
    expect(logActivity.log).toHaveBeenCalledWith("Appointment fetched");
  });

  it("should throw if appointment not found", async () => {
    appointmentMethodsMock.get.mockResolvedValue({});

    await expect(
      appointmentService.getAppointment("a1", "u1", "user")
    ).rejects.toThrow("No appointment found");
  });

  // =========================
  // GET ALL APPOINTMENTS
  // =========================

  it("should return all appointments for admin", async () => {
    const appointments = [{ _id: "a1" }];

    appointmentMethodsMock.getAll.mockResolvedValue(appointments);

    const result = await appointmentService.getAllAppointments(
      "any",
      "admin"
    );

    expect(result).toEqual(appointments);
  });

  it("should filter appointments for user", async () => {
    const appointments = [
      { userEmail: "user@mail.com" },
      { userEmail: "other@mail.com" },
    ];

    appointmentMethodsMock.getAll.mockResolvedValue(appointments);
    userMethodsMock.get.mockResolvedValue({ email: "user@mail.com" });

    const result = await appointmentService.getAllAppointments(
      "u1",
      "user"
    );

    expect(result.length).toBe(1);
  });

  it("should throw if no appointments found", async () => {
    appointmentMethodsMock.getAll.mockResolvedValue([]);

    await expect(
      appointmentService.getAllAppointments("u1", "user")
    ).rejects.toThrow("No appointments found");
  });

  // =========================
  // UPDATE APPOINTMENT
  // =========================

  it("should update appointment successfully", async () => {
    const data = {
      _id: "a1",
      userEmail: "user@mail.com",
      serviceProviderEmail: "sp@mail.com",
    };

    userMethodsMock.getByEmail.mockResolvedValue({ email: "user@mail.com" });
    servicePMethodsMock.getByEmail.mockResolvedValue({ email: "sp@mail.com" });

    appointmentMethodsMock.update.mockResolvedValue(data);

    const result = await appointmentService.updateAppointment(data as any);

    expect(email.sendUpdatedAppointment).toHaveBeenCalled();
    expect(logActivity.log).toHaveBeenCalledWith("Appointment Updated");
    expect(result).toEqual(data);
  });

  it("should throw if update fails", async () => {
    userMethodsMock.getByEmail.mockResolvedValue({ email: "user@mail.com" });
    servicePMethodsMock.getByEmail.mockResolvedValue({ email: "sp@mail.com" });

    appointmentMethodsMock.update.mockResolvedValue(null);

    await expect(
      appointmentService.updateAppointment({
        _id: "a1",
        userEmail: "user@mail.com",
        serviceProviderEmail: "sp@mail.com",
      } as any)
    ).rejects.toThrow("No appointment found with the id : a1");
  });

  // =========================
  // DELETE APPOINTMENT
  // =========================

  it("should delete appointment successfully", async () => {
    const appointment = {
      _id: "a1",
      userEmail: "user@mail.com",
      serviceProviderEmail: "sp@mail.com",
    };

    appointmentMethodsMock.delete.mockResolvedValue(appointment);

    const result = await appointmentService.deleteAppointment("a1");

    expect(email.sendDeletedAppointment).toHaveBeenCalled();
    expect(logActivity.log).toHaveBeenCalledWith("Appointment Deleted");
    expect(result).toEqual(appointment);
  });

  it("should throw if delete fails", async () => {
    appointmentMethodsMock.delete.mockResolvedValue(null);

    await expect(
      appointmentService.deleteAppointment("a1")
    ).rejects.toThrow("No appointment found with the id : a1");
  });

  // =========================
  // CHECK EXISTENCE
  // =========================

  it("should throw if user does not exist", async () => {
    userMethodsMock.getByEmail.mockResolvedValue({});

    await expect(
      appointmentService.checkExistence({
        userEmail: "missing@mail.com",
      } as any)
    ).rejects.toThrow("User does not exist");
  });

  it("should throw if service provider does not exist", async () => {
    userMethodsMock.getByEmail.mockResolvedValue({ email: "user@mail.com" });
    servicePMethodsMock.getByEmail.mockResolvedValue({});

    await expect(
      appointmentService.checkExistence({
        userEmail: "user@mail.com",
        serviceProviderEmail: "missing@mail.com",
      } as any)
    ).rejects.toThrow("Service Provider does not exist");
  });
});
