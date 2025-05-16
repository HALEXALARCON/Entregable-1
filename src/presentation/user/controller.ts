import { Request, Response } from "express";
import { CreatorUserService } from "./services/creator-user.service";



export class UserController {

  constructor(
    private readonly CreatorUserService: CreatorUserService
  ) { }


  register = (req: Request, res: Response) => { }

}