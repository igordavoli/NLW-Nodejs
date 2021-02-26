import { resolve } from 'path';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepositories';
import { SurveysRepository } from '../repositories/SurveysRepositories';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepositories';
import SendMailServece from '../services/SendMaileServece';

class SendMailController {
  async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({ email });
    const survey = await surveysRepository.findOne({ id: survey_id });

    if (!user) {
      return res.status(400).json({
        error: 'User does not exists',
      });
    }

    if (!survey) {
      return res.status(400).json({
        error: 'Survey does not exists'
      })
    }

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL,
    }

    const path = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

    const hasSurveyUser = await surveysUsersRepository.findOne({
      where: [{ user_id: user.id }, { value: null }],
      relations: ['user', 'survey']
    });

    if (hasSurveyUser) {
      await SendMailServece.execute(email, survey.title, variables, path);
      return res.status(400).json(hasSurveyUser)
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id: survey.id
    });

    await surveysUsersRepository.save(surveyUser);

    //enviar email para usuário
    await SendMailServece.execute(email, survey.title, variables, path);

    return res.status(201).json(surveyUser);
  }
}
export { SendMailController }