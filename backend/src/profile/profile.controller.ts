import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';
@Controller('uploads')
export class ProfileController {
  @Get('/:filename')
  async openImg(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const filePath = join(process.cwd(), 'uploads', `${filename}`);
      const readableStream = createReadStream(filePath);

      // Set response headers
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', `inline; filename=${filename}`);

      // Pipe the stream to the response
      readableStream.pipe(res);
    } catch (error) {
      console.error('Error opening image:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error opening PDF');
    }
  }
}
