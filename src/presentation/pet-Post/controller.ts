import { Request, Response } from "express";
import { CreatorPetPostService } from "./services/creator-pet-post.service";
import { FinderPetPostService } from "./services/finder.petpost.server";
import { ApprovePetPostservice } from "./services/aprove-pet-post.service";
import { RejectedPetPostService } from "./services/reject-pet-post.service";
import { ModifierPetPostService } from "./services/modifier-pet-post.service";
import { DeletePetPostService } from "./services/delete-pet-post.services";

export class PetPostController {
  constructor(
    private readonly creatorPetPostService: CreatorPetPostService,
    private readonly finderPetPostService: FinderPetPostService,
    private readonly aprovePetPostService: ApprovePetPostservice,
    private readonly rejectedPetpostService: RejectedPetPostService,
    private readonly modifierPetPostService: ModifierPetPostService,
    private readonly deletePetPostService: DeletePetPostService
  ) { }

  // Método para crear una nueva publicación de mascota
  create = async (req: Request, res: Response) => {
    try {
      const petPost = await this.creatorPetPostService.execute(req.body);
      res.status(200).json(petPost);
    } catch (error) {
      console.error("Error en create:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Método para obtener todas las publicaciones de mascotas
  findAll = async (_req: Request, res: Response) => {
    try {
      const petPosts = await this.finderPetPostService.executeByFindAll();
      res.status(200).json(petPosts);
    } catch (error) {
      console.error("Error en findAll:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Método para obtener una publicación de mascota por ID
  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const petPost = await this.finderPetPostService.executeByFindOne(id);
      if (!petPost) {
        res.status(404).json({ message: 'Pet post not found' });
      } else {
        res.status(200).json(petPost);
      }
    } catch (error) {
      console.error("Error en findOne:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Método para aprobar una publicación de mascota
  approve = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const petPost = await this.aprovePetPostService.execute(id);
      res.status(200).json(petPost);
    } catch (error) {
      console.error("Error en approve:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Método para borrar una publicación de mascota
  rejected = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const petPost = await this.rejectedPetpostService.execute(id);
      res.status(200).json(petPost);
    } catch (error) {
      console.error('Error en rejected:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Método para actualizar una publicación de mascota
  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const updatedPetPost = await this.modifierPetPostService.update(id, req.body);
      res.status(200).json(updatedPetPost);
    } catch (error) {
      console.error("Error en update:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Método para eliminar una publicación de mascota
  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await this.deletePetPostService.execute(id);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error en delete:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}
