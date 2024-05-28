import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('predict')
export class AiController {
  constructor(private readonly modelService: AiService) {}

  @Post()
  predict(
    @Body()
    body: {
      test_score: number;
      quiz_score: number;
      mid_exam_score: number;
      final_score: number;
    },
  ) {
    const prediction = this.modelService.predict(body);
    return { predicted_total_score: prediction };
  }
}
