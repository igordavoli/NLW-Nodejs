import { Request, Response } from 'express';
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class NPSControler {
  async execute(req: Request, res: Response) {
    const { survey_id } = req.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    })

    const detractor = surveysUsers.filter(survey => {
      return survey.value >= 0 && survey.value <= 6
    }).length;

    const passive = surveysUsers.filter(survey => {
      return survey.value >= 7 && survey.value <= 8
    }).length;

    const promoter = surveysUsers.filter(survey => {
      return survey.value >= 9 && survey.value <= 10
    }).length;

    const totalAnswers = surveysUsers.length;

    const NPScalcule = Number((((promoter - detractor) / totalAnswers) * 100).toFixed(2));

    return res.status(201).json({
      detractors: detractor,
      passives: passive,
      promoters: promoter,
      totalAnswers: totalAnswers,
      NPScalcule: NPScalcule,
      surveysUsers,
    })
  }
}

export { NPSControler };
