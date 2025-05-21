import { Request, Response } from "express";
import { CreatorUserService } from "./services/creator-user.service";
import { LoginUserService } from "./services/login-user.service";
import { FinderUserService } from "./services/finder-user.service";




export class UserController {

  constructor(
    private readonly CreatorUserService: CreatorUserService,
    private readonly LoginUserService: LoginUserService,
    private readonly finderUserService: FinderUserService,
  ) { }


  register = (req: Request, res: Response) => {
    this.CreatorUserService.execute(req.body)

      .then((user) => res.status(201).json(user))

      .catch((error) => res.status(500).json({ message: 'internal server error' }));
  };

  login = (req: Request, res: Response) => {
    this.LoginUserService.execute().then((data) => res.status(200).json(data))

      .catch((error) => res.status(500).json({ message: 'internal server error' }));
  };

  findAll = (req: Request, res: Response) => {
    this.finderUserService.executeByfindAll()

      .then((user) => res.status(201).json(user))

      .catch((error) => res.status(500).json({ message: 'internal server error' }));
  }

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderUserService.executeByFindOne(id)

      .then((data) => res.status(200).json(data))

      .catch((error) => res.status(500).json({ message: 'internal server error' }));
  }
}