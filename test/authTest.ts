import { authServiceClass } from "../service/authServiceClass";
import { authUtil } from "../factory/authFactory";
import { email, logActivity } from "../factory/utilFactory";
import bcrypt from "bcrypt";
import { serverError } from "../utils/errorUtil";

jest.mock("bcrypt");

jest.mock("../factory/authFactory", () => ({
  authUtil: {
    generateToken: jest.fn(),
    generateForgetToken: jest.fn(),
    decodeForgetToken: jest.fn(),
    hashPass: jest.fn(),
  },
}));

jest.mock("../factory/utilFactory", () => ({
  email: { send: jest.fn() },
  logActivity: { log: jest.fn() },
}));

describe("authServiceClass", () => {
  let userServiceMock: any;
  let serviceProviderMock: any;
  let authService: authServiceClass;

  beforeEach(() => {
    userServiceMock = {
      getByEmail: jest.fn(),
      get: jest.fn(),
      update: jest.fn(),
    };

    serviceProviderMock = {
      getByEmail: jest.fn(),
      get: jest.fn(),
      update: jest.fn(),
    };

    authService = new authServiceClass(
      userServiceMock,
      serviceProviderMock
    );

    jest.clearAllMocks();
  });

  // ======================
  // LOGIN - USER
  // ======================

  it("should login user successfully", async () => {
    const user = {
      _id: "u1",
      email: "user@mail.com",
      password: "hashed",
    };

    userServiceMock.getByEmail.mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (authUtil.generateToken as jest.Mock).mockReturnValue("token123");

    const token = await authService.login({
      email: "user@mail.com",
      password: "123",
      role: "user",
    } as any);

    expect(token).toBe("token123");
    expect(logActivity.log).toHaveBeenCalled();
  });

  it("should throw error if user password incorrect", async () => {
    userServiceMock.getByEmail.mockResolvedValue({
      email: "user@mail.com",
      password: "hashed",
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      authService.login({
        email: "user@mail.com",
        password: "wrong",
        role: "user",
      } as any)
    ).rejects.toThrow("Incorrect credentials or email");
  });

  // ======================
  // LOGIN - SERVICE PROVIDER
  // ======================

  it("should login service provider successfully", async () => {
    const sp = {
      _id: "sp1",
      email: "sp@mail.com",
      password: "hashed",
    };

    serviceProviderMock.getByEmail.mockResolvedValue(sp);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (authUtil.generateToken as jest.Mock).mockReturnValue("tokenSP");

    const token = await authService.login({
      email: "sp@mail.com",
      password: "123",
      role: "serviceProvider",
    } as any);

    expect(token).toBe("tokenSP");
  });

  // ======================
  // VALIDATE
  // ======================

  it("should validate user successfully", async () => {
    userServiceMock.get.mockResolvedValue({ email: "user@mail.com" });

    await expect(
      authService.validate("u1", "user")
    ).resolves.toBeUndefined();
  });

  it("should throw if validation fails", async () => {
    userServiceMock.get.mockResolvedValue({});

    await expect(
      authService.validate("u1", "user")
    ).rejects.toThrow("Please Validate Yourself");
  });

  // ======================
  // FORGET PASSWORD
  // ======================

  it("should generate forget token and send email", async () => {
    userServiceMock.getByEmail.mockResolvedValue({
      _id: "u1",
      email: "user@mail.com",
    });

    (authUtil.generateForgetToken as jest.Mock).mockReturnValue("forgetToken");

    const result = await authService.forget(
      "user@mail.com",
      "user"
    );

    expect(authUtil.generateForgetToken).toHaveBeenCalled();
    expect(email.send).toHaveBeenCalled();
    expect(result).toContain("forgetToken");
  });

  it("should throw if email not found in forget", async () => {
    userServiceMock.getByEmail.mockResolvedValue({});

    await expect(
      authService.forget("missing@mail.com", "user")
    ).rejects.toThrow(
      "No user or service provider found with the email"
    );
  });

  // ======================
  // RESET PASSWORD
  // ======================

  it("should reset password for user", async () => {
    (authUtil.decodeForgetToken as jest.Mock).mockReturnValue({
      mail: "user@mail.com",
      role: "user",
    });

    (authUtil.hashPass as jest.Mock).mockResolvedValue("newHashed");

    userServiceMock.getByEmail.mockResolvedValue({
      _id: "u1",
      email: "user@mail.com",
    });

    userServiceMock.update.mockResolvedValue({
      _id: "u1",
      email: "user@mail.com",
    });

    const result = await authService.resetPass(
      "token",
      "newPassword"
    );

    expect(authUtil.hashPass).toHaveBeenCalledWith("newPassword");
    expect(logActivity.log).toHaveBeenCalledWith("Password Changed");
    expect(result._id).toBe("u1");
  });

  it("should throw if reset user not found", async () => {
    (authUtil.decodeForgetToken as jest.Mock).mockReturnValue({
      mail: "user@mail.com",
      role: "user",
    });

    userServiceMock.getByEmail.mockResolvedValue({});

    await expect(
      authService.resetPass("token", "pass")
    ).rejects.toThrow(
      "No user or service provider found with the email"
    );
  });
});
