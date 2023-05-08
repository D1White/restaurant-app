import { Matches, MinLength } from 'class-validator';
import { SLUG_REGEX } from 'utils/constants';

export class CreateCategoryDto {
  @MinLength(2)
  name: string;

  @MinLength(2)
  @Matches(SLUG_REGEX, { message: 'incorrect slug' })
  slug: string;
}
