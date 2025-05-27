import { PetPost } from "../../../data";
import { customError } from "../../../domain/errors";

export class CreatorPetPostService {

  async execute(data: any) {

    const petPost = new PetPost();

    petPost.petName = data.petName.trim().toLowerCase();
    petPost.description = data.description.trim().toLowerCase();
    petPost.image_url = data.imagen_url.trim();

    try {
      return await petPost.save();
    } catch (error) {
      throw customError.internalServer('internal server error');
    }
  }
}