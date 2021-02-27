import { Request, Response } from 'express';
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswersControler {
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({ id: String(u) });

    if (!surveyUser) {
      return res.status(400).json({ error: 'SurveyUser does not exists' })
    }
    surveyUser.value = Number(value)

    await surveysUsersRepository.save(surveyUser);
    return res.status(201).json(surveyUser);
  }
}

export { AnswersControler };
