import { userServiceClass } from "../service/userServiceClass";
import { authUtil } from "../factory/authFactory";
import { logActivity, email } from "../factory/utilFactory";

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

describe("userServiceClass", () => {
  let userMethodsMock: any;
  let userService: userServiceClass;

  beforeEach(() => {
    userMethodsMock = {
      getByEmail: jest.fn(),
      create: jest.fn(),
      get: jest.fn(),
      getAll: jest.fn(),
      delete: jest.fn(),
    };

    userService = new userServiceClass(userMethodsMock);

    jest.clearAllMocks();
  });

  // =========================
  // CREATE USER
  // =========================

  it("should create user successfully", async () => {
    const mockData = {
      email: "test@mail.com",
      password: "password123",
    };

    const createdUser = {
      _id: "123",
      email: "test@mail.com",
    };

    userMethodsMock.getByEmail.mockResolvedValue({});
    (authUtil.hashPass as jest.Mock).mockResolvedValue("hashedPassword");
    userMethodsMock.create.mockResolvedValue(createdUser);
    (authUtil.generateToken as jest.Mock).mockReturnValue("token123");

    const result = await userService.createUser(mockData as any);

    expect(authUtil.hashPass).toHaveBeenCalledWith("password123");
    expect(userMethodsMock.create).toHaveBeenCalled();
    expect(authUtil.generateToken).toHaveBeenCalledWith("123", "user");
    expect(email.send).toHaveBeenCalledWith("test@mail.com", "Welcome !");
    expect(logActivity.log).toHaveBeenCalledWith("New User Created");

    expect(result).toEqual({
      user: createdUser,
      token: "token123",
    });
  });

  it("should throw error if email already exists", async () => {
    userMethodsMock.getByEmail.mockResolvedValue({
      email: "test@mail.com",
    });

    await expect(
      userService.createUser({ email: "test@mail.com" } as any)
    ).rejects.toThrow("User with the specified email already exists");
  });

  it("should throw error if create fails", async () => {
    userMethodsMock.getByEmail.mockResolvedValue({});
    (authUtil.hashPass as jest.Mock).mockResolvedValue("hashedPassword");
    userMethodsMock.create.mockResolvedValue(null);

    await expect(
      userService.createUser({ email: "test@mail.com", password: "123" } as any)
    ).rejects.toThrow("Error while creating a user");
  });

  // =========================
  // GET USER
  // =========================

  it("should return user by id", async () => {
    const mockUser = { _id: "123", email: "test@mail.com" };

    userMethodsMock.get.mockResolvedValue(mockUser);

    const result = await userService.getUser("123");

    expect(result).toEqual(mockUser);
    expect(logActivity.log).toHaveBeenCalledWith("User Fetched");
  });

  it("should throw error if user not found by id", async () => {
    userMethodsMock.get.mockResolvedValue(null);

    await expect(userService.getUser("123")).rejects.toThrow(
      "No user found with the id : 123"
    );
  });

  // =========================
  // GET ALL USERS
  // =========================

  it("should return all users", async () => {
    const users = [{ email: "a@mail.com" }];

    userMethodsMock.getAll.mockResolvedValue(users);

    const result = await userService.getAllUsers();

    expect(result).toEqual(users);
    expect(logActivity.log).toHaveBeenCalledWith("All Users Fetched");
  });

  it("should throw error if no users found", async () => {
    userMethodsMock.getAll.mockResolvedValue([]);

    await expect(userService.getAllUsers()).rejects.toThrow(
      "No users found"
    );
  });

  // =========================
  // DELETE USER
  // =========================

  it("should delete user successfully", async () => {
    const deletedUser = { email: "test@mail.com" };

    userMethodsMock.delete.mockResolvedValue(deletedUser);

    const result = await userService.deleteUser("123");

    expect(email.send).toHaveBeenCalledWith(
      "test@mail.com",
      "Your account has been deleted"
    );
    expect(logActivity.log).toHaveBeenCalledWith("User Deleted");
    expect(result).toEqual(deletedUser);
  });

  it("should throw error if delete fails", async () => {
    userMethodsMock.delete.mockResolvedValue(null);

    await expect(userService.deleteUser("123")).rejects.toThrow(
      "No user found with the id : 123"
    );
  });

  // =========================
  // GET BY EMAIL
  // =========================

  it("should return user by email", async () => {
    const user = { email: "test@mail.com" };

    userMethodsMock.getByEmail.mockResolvedValue(user);

    const result = await userService.getByEmail("test@mail.com");

    expect(result).toEqual(user);
    expect(logActivity.log).toHaveBeenCalledWith(
      "User fetched using email"
    );
  });

  it("should throw error if email not found", async () => {
    userMethodsMock.getByEmail.mockResolvedValue({});

    await expect(
      userService.getByEmail("missing@mail.com")
    ).rejects.toThrow("User with specified email does not exist");
  });
});
