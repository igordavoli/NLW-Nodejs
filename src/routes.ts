import { Router } from 'express';
import { SurveysControeller } from './controllers/SurveysControeller';
import { UserController } from './controllers/UserController';
import { SendMailController } from './controllers/SendMailController';

const router = Router();
const userController = new UserController();
const surveysController = new SurveysControeller();
const sendMailController = new SendMailController();

router.post("/users", userController.create);
router.post("/surveys", surveysController.crate);
router.get("/surveys", surveysController.show);
router.post("/sendMail", sendMailController.execute);
export { router };

