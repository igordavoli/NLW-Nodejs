import { Router } from 'express';
import { SurveysControeller } from './controllers/SurveysControeller';
import { UserController } from './controllers/UserController';

const router = Router();
const userController = new UserController();
const surveysController = new SurveysControeller();

router.post("/users", userController.create);
router.post("/surveys", surveysController.crate);
router.get("/surveys", surveysController.show);

export { router };

