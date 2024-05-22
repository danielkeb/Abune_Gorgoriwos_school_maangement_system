// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import axios from 'axios';
// import { AppContext } from '@/components/context/UserContext';
// import Certificate from './studentcertificate';

// // Mock AppContext and axios
// jest.mock('@/components/context/UserContext', () => ({
//   AppContext: React.createContext({
//     decodedToken: { sub: '123' },
//     token: 'test-token',
//     logout: jest.fn(),
//   }),
// }));

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe('Certificate Component', () => {
//   const mockStudentData = {
//     section: { studentId: 1 },
//     first_name: 'John',
//     last_name: 'Doe',
//     school_name: 'Test School',
//     grade: {
//       grade: 'Grade 1',
//       subject: [{ id: 1, name: 'Math' }, { id: 2, name: 'Science' }],
//     },
//     results: [
//       { totalScore1: 80, totalScore2: 85, subjectId: 1 },
//       { totalScore1: 75, totalScore2: 80, subjectId: 2 },
//     ],
//     firstrank: 1,
//     secondtrank: 2,
//     overallrank: 1,
//   };

//   beforeEach(() => {
//     mockedAxios.get.mockResolvedValue({ data: mockStudentData });
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders the certificate correctly with fetched data', async () => {
//     render(
//       <AppContext.Provider value={{ decodedToken: { sub: '123' }, token: 'test-token', logout: jest.fn() }}>
//         <Certificate id="test-id" />
//       </AppContext.Provider>
//     );

//     await waitFor(() => {
//       expect(screen.getByText(/Debrebrhan Test School School Branch Digital Certificate/i)).toBeInTheDocument();
//       expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
//       expect(screen.getByText(/Grade 1/i)).toBeInTheDocument();
//     });
//   });

//   it('shows no certificate message if no rank data is available', async () => {
//     mockedAxios.get.mockResolvedValueOnce({ data: { ...mockStudentData, firstrank: undefined } });

//     render(
//       <AppContext.Provider value={{ decodedToken: { sub: '123' }, token: 'test-token', logout: jest.fn() }}>
//         <typeof Certificate id="test-id" />
//       </AppContext.Provider>
//     );

//     await waitFor(() => {
//       expect(screen.getByText(/No Certificate to Display!/i)).toBeInTheDocument();
//       expect(screen.getByText(/Try again later, No rank generated yet!/i)).toBeInTheDocument();
//     });
//   });
// });

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { AppContext } from '../../context/index';
import Certificate from './studentcertificate';

// Mock AppContext and axios
jest.mock('../../../components/context/UserContext', () => ({
  AppContext: React.createContext({
    decodedToken: { sub: '123' },
    token: 'test-token',
    logout: jest.fn(),
  }),
}));

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Certificate Component', () => {
  const mockStudentData = {
    // ...
  };

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockStudentData });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the certificate correctly with fetched data', async () => {
    render(
      <AppContext.Provider value={{ decodedToken: { sub: '123' }, token: 'test-token', logout: jest.fn() }}>
        <Certificate id="test-id" />
      </AppContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Debrebrhan Test School School Branch Digital Certificate/i)).toBeInTheDocument();
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Grade 1/i)).toBeInTheDocument();
    });
  });

  it('shows no certificate message if no rank data is available', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { ...mockStudentData, firstrank: undefined } });

    render(
      <AppContext.Provider value={{ decodedToken: { sub: '123' }, token: 'test-token', logout: jest.fn() }}>
        <Certificate id="test-id" />
      </AppContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/No Certificate to Display!/i)).toBeInTheDocument();
      expect(screen.queryByText(/Debrebrhan Test School School Branch Digital Certificate/i)).not.toBeInTheDocument();
    });
  });
});