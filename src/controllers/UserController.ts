import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;
    const usersRepository = getCustomRepository(UsersRepository);
    //SELECT * FROM users WHERE email= 'email' 
    const userAlreadExists = await usersRepository.findOne({ email })

    const user = usersRepository.create({ name, email });

    if (userAlreadExists) {
      return res.status(400).json({
        error: 'User already exists!'
      })
    }

    await usersRepository.save(user);

    return res.status(201).json(user)
  }
}

export { UserController };
