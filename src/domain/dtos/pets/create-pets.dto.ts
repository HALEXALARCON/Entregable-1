export class CreatePetDto {
  constructor(
    public readonly petName: string,
    public readonly description: string,
    public readonly image_url: string
  ) { }

  static execute(object: { [key: string]: any }): [string?, CreatePetDto?] {
    const { petName, description, image_url } = object;

    if (typeof petName !== 'string' || !petName.trim()) {
      return ['Pet name is required'];
    }

    if (typeof description !== 'string' || !description.trim()) {
      return ['Description is required'];
    }

    if (typeof image_url !== 'string' || !image_url.trim()) {
      return ['Image URL is required'];
    }

    return [
      undefined,
      new CreatePetDto(
        petName.trim(),
        description.trim(),
        image_url.trim()
      )
    ];
  }
}
