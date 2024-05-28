import { Injectable } from '@nestjs/common';
//import { join } from 'path';

@Injectable()
export class AiService {
  private model: any;

  // constructor() {
  //   this.model = joblib.load(
  //     join(__dirname, '../models/student_performance_model.pkl'),
  //   );
  // }

  predict(scores: {
    test_score: number;
    quiz_score: number;
    mid_exam_score: number;
    final_score: number;
  }): number {
    const prediction = this.model.predict([
      [
        scores.test_score,
        scores.quiz_score,
        scores.mid_exam_score,
        scores.final_score,
      ],
    ]);
    return prediction[0];
  }
}
