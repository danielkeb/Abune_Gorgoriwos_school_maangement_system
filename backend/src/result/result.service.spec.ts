import { ResultService } from './result.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config/dist'; // Import the appropriate ConfigService if necessary

describe('ResultService', () => {
  let resultService: ResultService;
  let prismaService: PrismaService;

  beforeEach(() => {
    const configService = new ConfigService(); // Create an instance of ConfigService if necessary
    prismaService = new PrismaService(configService); // Provide the configService to PrismaService constructor
    resultService = new ResultService(prismaService);
  });


test('example test', () => {
  expect(true).toBe(true);
});

  describe('makeAnalysis', () => {
    it('should return analysis data for a given grade and semester', async () => {
      // Mock the PrismaService methods to return dummy data
      prismaService.subject.findMany = jest.fn().mockResolvedValue([
        { id: 1, name: 'Math' },
        { id: 2, name: 'Science' },
      ]);

      prismaService.result.findMany = jest.fn().mockResolvedValue([
        { subjectId: 1, totalScore1: 40, totalScore2: 50 },
        { subjectId: 1, totalScore1: 60, totalScore2: 70 },
        { subjectId: 2, totalScore1: 70, totalScore2: 80 },
      ]);

      prismaService.teacher.findUnique = jest.fn().mockResolvedValue({
        user: { first_name: 'John', last_name: 'Doe' },
      });

      // Call the makeAnalysis method with gradeId = 1 and semesterId = 1
      const analysisData = await resultService.makeAnalysis(1, 1);

      // Assertions
      expect(analysisData).toHaveLength(2); // Two subjects should be analyzed
      expect(analysisData[0].subject).toBe('Math');
      expect(analysisData[0]['Below 50']).toBe(50); // 50% of students scored below 50 in Math
      expect(analysisData[0]['50-60']).toBe(50); // 50% of students scored between 50 and 60 in Math
      expect(analysisData[0]['Above 60']).toBe(0); // 0% of students scored above 60 in Math
      expect(analysisData[0].teacher_Name).toEqual({ first_name: 'John', last_name: 'Doe' });
    });

    // Add more test cases for different scenarios if needed
  });

  // Add more test cases as needed for other methods of ResultService
});