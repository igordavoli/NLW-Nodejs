import { Request, Response } from 'express';
import { getCustomRepository } from "typeorm";
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswersControler {
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({ id: String(u) });

    if (!surveyUser) {
      throw new AppError('SurveyUser does not exists', 400);
    }
    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);
    return res.status(201).json(surveyUser);
  }
}

export { AnswersControler };
