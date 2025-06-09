import { PetPost, PetPostStatus, User } from "../../../data";
import { CreatePetDto } from "../../../domain/dtos/pets/create-pets.dto";


export class CreatorPetPostService {
  async execute(dto: CreatePetDto, user: User): Promise<PetPost> {
    const petPost = new PetPost();

    petPost.petName = dto.petName;
    petPost.description = dto.description;
    petPost.image_url = dto.image_url;
    petPost.user = user;
    petPost.status = PetPostStatus.PENDING; // ✅ ENUM
    petPost.hasFound = false;

    await petPost.save();
    return petPost;
  }
}
