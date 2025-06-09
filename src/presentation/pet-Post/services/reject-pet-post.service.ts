import { PetPost, PetPostStatus } from "../../../data";
import { CustomError } from "../../../domain/errors";
import { FinderPetPostService } from "./finder.petpost.server";

export class RejectedPetPostService {

  constructor(
    private readonly finderPetPostService: FinderPetPostService
  ) { }

  async execute(id: string) {
    const petPost = await this.finderPetPostService.executeByFindOne(id);

    if (petPost.status === PetPostStatus.APPROVED) {
      throw CustomError.badRequest('Pet post already approved');
    }

    if (petPost.status === PetPostStatus.REJECTED) {
      throw CustomError.badRequest('Pet post already rejected');
    }

    petPost.status = PetPostStatus.REJECTED;

    try {
      await PetPost.update({ id }, { status: PetPostStatus.REJECTED });

      return {
        message: 'Pet post rejected successfully',
      };
    } catch (error) {
      throw CustomError.internalServer('Internal server error');
    }
  }
}
