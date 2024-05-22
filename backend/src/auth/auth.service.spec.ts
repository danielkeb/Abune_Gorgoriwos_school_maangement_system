import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../././prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { NotAcceptableException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
            subject: {
              findMany: jest.fn(),
            },
            student: {
              update: jest.fn(),
              create: jest.fn(),
              findUnique: jest.fn(),
            },
            result: {
              create: jest.fn(),
            },
            school: {
              findUnique: jest.fn(),
            },
            teacher: {
              create: jest.fn(),
            },
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendSecurityAlert: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUpSuperAdmin', () => {
    it('should throw NotAcceptableException if email already exists', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        email: 'test@example.com',
      });

      await expect(
        service.signUpSuperAdmin({
          email: 'test@example.com',
          password: 'password',
          frist_name: 'First',
          middle_name: 'Middle',
          last_name: 'Last',
          role: 'superadmin',
          gender: 'M',
          address: '',
          phone: '',
          date_of_birth: '',
        }),
      ).rejects.toThrow(NotAcceptableException);
    });

    it('should create a new super admin user', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prismaService.user.create as jest.Mock).mockResolvedValue({
        id: 1,
        email: 'test@example.com',
      });

      const result = await service.signUpSuperAdmin({
        email: 'test@example.com',
        password: 'password',
        frist_name: 'First',
        middle_name: 'Middle',
        last_name: 'Last',
        role: 'superadmin',
        gender: 'M',
        address: '',
        phone: '',
        date_of_birth: '',
      });

      expect(prismaService.user.create).toHaveBeenCalled();
      expect(result).toEqual({ msg: 'sign up successfully' });
    });
  });

  describe('signIn', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.signIn({ email: 'test@example.com', password: 'password' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return access token if user found', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'admin',
        frist_name: 'First',
        school_Id: 1,
      });
      (jwtService.signAsync as jest.Mock).mockResolvedValue('access_token');

      const result = await service.signIn({
        email: 'test@example.com',
        password: 'password',
      });

      expect(result).toEqual({ access_token: 'access_token' });
    });
  });
});
