import { petPostStatus } from "../../../data";
import { FinderPetPostService } from "./finder.petpost.server";

export class RejectedPetPostService {

  constructor(
    private readonly finderPetPostService: FinderPetPostService
  ) { };


  async execute(id: string) {

    const petPost = await this.finderPetPostService.executeByFindOne(id);


    if (petPost.status === 'approved') {
      throw new Error('Pet post already approved');
    }

    if (petPost.status === 'rejected') {
      throw new Error('Pet post already rejected');
    }


    petPost.status = petPostStatus.REJECTED;


    try {
      await petPost.save();

      return {
        message: 'Pet post rejected successfully',
      }
    } catch (error) {
      throw new Error('Error rejecting pet post');
    }
  }
}