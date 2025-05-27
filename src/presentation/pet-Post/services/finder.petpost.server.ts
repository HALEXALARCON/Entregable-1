import { PetPost, petPostStatus } from "../../../data";
import { customError } from "../../../domain/errors";


export class FinderPetPostService {

  async executeByFindAll() {

    return await PetPost.find({

      where: {
        status: petPostStatus.APPROVED,
        hasFound: false,
      }
    })
  }


  async executeByFindOne(id: string) {
    const petPost = await PetPost.findOne({
      where: {
        id: id,
      },
    });

    if (!petPost) {
      throw customError.notFound('pet not found');
    }

    return petPost;
  }
}