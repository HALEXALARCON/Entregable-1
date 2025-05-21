import { User } from "../../../data";


export class FinderUserService {

  async executeByfindAll() {

    return await User.find({
      select: ['id', 'name', 'email'],
      where: {

        status: true,

      },
    });
  }
}