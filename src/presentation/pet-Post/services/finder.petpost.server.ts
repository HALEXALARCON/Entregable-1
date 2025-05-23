import { PetPost, petPostStatus } from "../../../data";


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
      throw new Error('pet post not found');
    }

    return petPost;
  }
}