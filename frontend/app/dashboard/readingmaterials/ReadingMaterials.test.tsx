
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import axiosMock from 'axios-mock-adapter';
import ReadingMaterials from './index'; // Adjust the path as necessary

const mock = new axiosMock(axios);

describe('ReadingMaterials Component', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should render filter inputs and fetch materials', async () => {
    mock.onGet('http://localhost:3333/coursematerial/get').reply(200, [
      { id: 1, description: 'Math Material', gradeLevel: [{ grade: '10', subject: [{ name: 'mathematics' }] }], subject: 'Mathematics', file: 'math.pdf' },
      { id: 2, description: 'Biology Material', gradeLevel: [{ grade: '12', subject: [{ name: 'biology' }] }], subject: 'Biology', file: 'biology.pdf' },
    ]);

    render(<ReadingMaterials/>);

    expect(screen.getByPlaceholderText('Filter by keyword (e.g., description)')).toBeInTheDocument();
    expect(screen.getByText('Select grade')).toBeInTheDocument();
    expect(screen.getByText('Select subject')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Math Matkjerial')).toBeInTheDocument();
      expect(screen.getByText('Biology Material')).toBeInTheDocument();
    });
  });

  it('should filter materials based on user input', async () => {
    mock.onGet('http://localhost:3333/coursematerial/get').reply(200, [
      { id: 1, description: 'Math Material', gradeLevel: [{ grade: '10', subject: [{ name: 'mathematics' }] }], subject: 'Mathematics', file: 'math.pdf' },
      { id: 2, description: 'Biology Material', gradeLevel: [{ grade: '12', subject: [{ name: 'biology' }] }], subject: 'Biology', file: 'biology.pdf' },
    ]);

    render(<ReadingMaterials />);

    await waitFor(() => {
      expect(screen.getByText('Math Material')).toBeInTheDocument();
      expect(screen.getByText('Biology Material')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Filter by keyword (e.g., description)'), { target: { value: 'Math' } });
    await waitFor(() => {
      expect(screen.getByText('Math Material')).toBeInTheDocument();
      expect(screen.queryByText('Biology Material')).not.toBeInTheDocument();
    });
  });

  it('should open and close PDF viewer', async () => {
    mock.onGet('http://localhost:3333/coursematerial/get').reply(200, [
      { id: 1, description: 'Math Material', gradeLevel: [{ grade: '10', subject: [{ name: 'mathematics' }] }], subject: 'Mathematics', file: 'math.pdf' },
    ]);

    mock.onGet('http://localhost:3333/math.pdf').reply(200, new Blob(['PDF content'], { type: 'application/pdf' }));

    render(<ReadingMaterials />);

    await waitFor(() => {
      expect(screen.getByText('Math Material')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Read Material'));

    await waitFor(() => {
      expect(screen.getByTitle('PDF Viewer')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('close-pdf-button'));

    await waitFor(() => {
      expect(screen.queryByTitle('PDF Viewer')).not.toBeInTheDocument();
    });
  });
});