import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
  async create(req: Request, res: Response) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
    })

    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ error: error })
    }

    const { name, email } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    //SELECT * FROM users WHERE email= 'email' 
    const userAlreadExists = await usersRepository.findOne({ email })

    const user = usersRepository.create({ name, email });

    if (userAlreadExists) {
      throw new AppError('User already exists!', 400);
    }

    await usersRepository.save(user);

    return res.status(201).json(user)
  }
}

export { UserController };
