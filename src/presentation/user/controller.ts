import { Request, Response } from "express";
import { CreatorUserService } from "./services/creator-user.service";
import { LoginUserService } from "./services/login-user.service";
import { FinderUserService } from "./services/finder-user.service";
import { DeleteUserService } from "./services/delete-user.service";
import { ModifierUserService } from "./services/modifier-user.service";

export class UserController {
  constructor(
    private readonly creatorUserService: CreatorUserService,
    private readonly loginUserService: LoginUserService,
    private readonly finderUserService: FinderUserService,
    private readonly modifierUserService: ModifierUserService,
    private readonly deleteUserService: DeleteUserService,
  ) { }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.creatorUserService.execute(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { error: error.message })
      });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const data = await this.loginUserService.execute(req.body);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { error: error.message })
      });
    }
  };

  findAll = async (_req: Request, res: Response) => {
    try {
      const users = await this.finderUserService.executeByFindAll();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { error: error.message })
      });
    }
  };

  findOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.finderUserService.executeByFindOne(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { error: error.message })
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log("id", id)
      const updatedUser = await this.modifierUserService.update(id, req.body);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      console.log("error catch controller", error)
      res.status(400).json({ message: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await this.deleteUserService.execute(id);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === "User not found") {
        res.status(404).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default UserController;
