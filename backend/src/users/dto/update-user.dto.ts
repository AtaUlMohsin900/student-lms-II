import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name: undefined;
  phone: undefined;
  dateOfBrith: undefined;
  profilePictureUrl: undefined;
}
