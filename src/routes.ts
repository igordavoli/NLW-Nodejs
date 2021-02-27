import { Router } from 'express';
import { SurveysControeller } from './controllers/SurveysControeller';
import { UserController } from './controllers/UserController';
import { SendMailController } from './controllers/SendMailController';
import { AnswersControler } from './controllers/UnswerController';
import { NPSControler } from './controllers/NPSControler';

const router = Router();
const userController = new UserController();
const surveysController = new SurveysControeller();
const sendMailController = new SendMailController();
const answerControler = new AnswersControler();
const npsControler = new NPSControler();

router.post('/users', userController.create);
router.post('/surveys', surveysController.crate);
router.get('/surveys', surveysController.show);
router.post('/sendMail', sendMailController.execute);
router.get('/answers/:value', answerControler.execute);
router.get('/nps/:survey_id', npsControler.execute);

export { router };

