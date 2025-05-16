import { Request, Response } from "express";
import { CreatorUserService } from "./services/creator-user.service";
import { LoginUserService } from "./services/login-user.service";



export class UserController {

  constructor(
    private readonly CreatorUserService: CreatorUserService,
    private readonly LoginUserService: LoginUserService,
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

}