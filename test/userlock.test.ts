import { userServiceClass } from "../service/userServiceClass";
import { authUtil } from "../factory/authFactory";
import { logActivity, email } from "../factory/utilFactory";
import { lockManager } from "../factory/utilFactory";
import type { baseUser } from "../repository/user/baseUser";
import type { inMemoryLockClass } from "../utils/inMemoryLockUtils";

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
let created = false;

let storedUser: any = null;

let userMethodsMock = {
    getByEmail: jest.fn(async () => {
        return storedUser;
    }),

    create: jest.fn(async (data) => {

        if(storedUser != null) return null;

        storedUser = {
            _id: "123",
            ...data
        };
        return storedUser;
    }),
    get: jest.fn(),
    getAll: jest.fn(),
    delete: jest.fn(),
    update : jest.fn()
};

  const lockManagerMock = {
      acquire: jest.fn().mockResolvedValue(jest.fn())
  } as unknown as inMemoryLockClass;

  let userService: userServiceClass;


  beforeEach(() => {
    userMethodsMock = {
    getByEmail: jest.fn(async () => {
        return storedUser;
    }),

    create: jest.fn(async (data) => {

        if(storedUser != null) return null;

        storedUser = {
            _id: "123",
            ...data
        };
        return storedUser;
    }),
    get: jest.fn(),
    getAll: jest.fn(),
    delete: jest.fn(),
    update : jest.fn()
    };

    userService = new userServiceClass(userMethodsMock, lockManagerMock);

    jest.clearAllMocks();
  });

  // =========================
  // CREATE USER
  // =========================

  // it("should create user successfully", async () => {
  //   const mockData = {
  //     email: "test@mail.com",
  //     password: "password123",
  //   };

  //   const createdUser = {
  //     _id: "123",
  //     email: "test@mail.com",
  //   };

  //   userMethodsMock.getByEmail.mockResolvedValue({});
  //   (authUtil.hashPass as jest.Mock).mockResolvedValue("hashedPassword");
  //   userMethodsMock.create.mockResolvedValue(createdUser);
  //   (authUtil.generateToken as jest.Mock).mockReturnValue("token123");

  //   const result = await userService.createUser(mockData as any);

  //   expect(authUtil.hashPass).toHaveBeenCalledWith("password123");
  //   expect(userMethodsMock.create).toHaveBeenCalled();
  //   expect(authUtil.generateToken).toHaveBeenCalledWith("123", "user");
  //   expect(email.send).toHaveBeenCalledWith("test@mail.com", "Welcome !");
  //   expect(logActivity.log).toHaveBeenCalledWith("New User Created");

  //   expect(result).toEqual({
  //     user: createdUser,
  //     token: "token123",
  //   });
  // });

it("should prevent duplicate user creation using lock", async () => {

    const userData = {
        email: "test@gmail.com",
        password: "123456",
        name: "Test",
        phonenumber : 999999,
        role : "user"
    };

    const create1 = userService.createUser(userData);
    const create2 = userService.createUser(userData);

    const results = await Promise.allSettled([create1, create2]);
    console.log("Results : ", results);

    const success = results.filter(r => r.status === "fulfilled");
    const failed = results.filter(r => r.status === "rejected");

    expect(success.length).toBe(1);
    expect(failed.length).toBe(1);
});

})