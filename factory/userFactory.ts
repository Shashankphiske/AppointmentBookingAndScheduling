import { userControllerClass } from "../controller/userControllerClass";
import { userMongoRepoClass } from "../repository/user/userMongoRepo";
import { userServiceClass } from "../service/userServiceClass";
import { inMemoryLockClass } from "../utils/inMemoryLockUtils";

const userMongoRepo = new userMongoRepoClass();
const lockManager = new inMemoryLockClass()
const userServices = new userServiceClass(userMongoRepo, lockManager);
const userController = new userControllerClass(userServices);

export { userController };