import { User } from "../../../data";
import { CustomError } from "../../../domain/errors";


export class CreatorUserService {
  async execute(data: any): Promise<User> {
    const user = new User();

    // Asigna los campos del DTO
    user.name = data.name?.trim().toLowerCase();
    user.email = data.email?.trim().toLowerCase();
    user.password = data.password?.trim();

    // Asegura que el campo 'status' tenga un valor por defecto
    user.status = true;

    try {
      // Intenta insertar el usuario en la base de datos
      return await user.save();
    } catch (err: any) {

      CustomError.internalServer('internal server error');

      // Lanza el error original para su manejo posterior
      throw err;
    }
  }
}
