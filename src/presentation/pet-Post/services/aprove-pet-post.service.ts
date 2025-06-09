import { PetPost, PetPostStatus } from "../../../data";
import { CustomError } from "../../../domain/errors";
import { FinderPetPostService } from "./finder.petpost.server";

export class ApprovePetPostservice {
  constructor(private readonly finderPetPostService: FinderPetPostService) { }

  async execute(id: string) {
    const petPost = await this.finderPetPostService.executeByFindOne(id);

    if (petPost.status === PetPostStatus.APPROVED) {
      return {
        message: "Pet post already approved",
      };
    }

    petPost.status = PetPostStatus.APPROVED;

    try {
      await PetPost.update({ id }, { status: PetPostStatus.APPROVED });

      return {
        message: "Pet post approved successfully",
      };
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
}
