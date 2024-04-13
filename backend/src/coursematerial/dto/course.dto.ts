import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class UploadCourse {
  @IsNotEmpty()
  @IsString()
  description: string;

  // @IsNotEmpty()
  // @IsString() // Ensure the file is a valid MIME type
  // file: string; // In a real application, you might use a specific file type, such as Express's `Express.Multer.File`

  @IsOptional()
  @IsInt()
  subjectId?: number;
}
