import { Request, Response } from 'express';
import { CreatorPetPostService } from './services/creator-pet-post.service';
import { FinderPetPostService } from './services/finder.petpost.server';
import { ApprovePetPostservice } from './services/aprove-pet-post.service';
import { RejectedPetPostService } from './services/reject-pet-post.service';
import { ModifierPetPostService } from './services/modifier-pet-post.service';
import { DeletePetPostService } from './services/delete-pet-post.services';
import { handleError } from '../common/errors/handleError';
import { CreatePetDto } from '../../domain/dtos/pets/create-pets.dto';
import { classToPlain } from 'class-transformer';
import { User } from '../../data';

export class PetPostController {
  constructor(
    private readonly creatorPetPostService: CreatorPetPostService,
    private readonly finderPetPostService: FinderPetPostService,
    private readonly approvePetPostService: ApprovePetPostservice,
    private readonly rejectedPetPostService: RejectedPetPostService,
    private readonly modifierPetPostService: ModifierPetPostService,
    private readonly deletePetPostService: DeletePetPostService
  ) { }

  // Crear una nueva publicación de mascota
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const [error, dto] = CreatePetDto.execute(req.body);

      if (error) {
        res.status(400).json({ error });
        return;
      }

      if (!dto) {
        res.status(500).json({ error: 'Unexpected DTO error' });
        return;
      }

      const user = req.body.sessionUser as User;
      if (!user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const petPost = await this.creatorPetPostService.execute(dto, user);
      const response = classToPlain(petPost);
      res.status(201).json(response);
    } catch (error) {
      handleError(error, res);
    }
  };

  findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const petPosts = await this.finderPetPostService.executeByFindAll();
      const response = classToPlain(petPosts);
      res.status(200).json(response);
    } catch (error) {
      handleError(error, res);
    }
  };

  findOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const petPost = await this.finderPetPostService.executeByFindOne(id);
      if (!petPost) {
        res.status(404).json({ message: 'Pet post not found' });
        return;
      }

      const response = classToPlain(petPost);
      res.status(200).json(response);
    } catch (error) {
      handleError(error, res);
    }
  };

  approve = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const petPost = await this.approvePetPostService.execute(id);
      res.status(200).json(petPost);
    } catch (error) {
      handleError(error, res);
    }
  };

  rejected = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const petPost = await this.rejectedPetPostService.execute(id);
      res.status(200).json(petPost);
    } catch (error) {
      handleError(error, res);
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedPetPost = await this.modifierPetPostService.update(id, req.body);
      res.status(200).json(updatedPetPost);
    } catch (error) {
      handleError(error, res);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.deletePetPostService.execute(id);
      res.status(200).json(result);
    } catch (error) {
      handleError(error, res);
    }
  };
}
