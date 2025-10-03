import { Person, Student, Professor } from '@/types';

const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;
        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (response.status === 204) {
                return null as T;
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Person endpoints
    async getPersons(): Promise<Person[]> {
        return this.request<Person[]>('/persons');
    }

    async getPerson(id: number): Promise<Person> {
        return this.request<Person>(`/persons/${id}`);
    }

    async createPerson(person: Person): Promise<Person> {
        return this.request<Person>('/persons', {
            method: 'POST',
            body: JSON.stringify(person),
        });
    }

    async updatePerson(id: number, person: Person): Promise<Person> {
        return this.request<Person>(`/persons/${id}`, {
            method: 'PUT',
            body: JSON.stringify(person),
        });
    }

    async deletePerson(id: number): Promise<void> {
        return this.request<void>(`/persons/${id}`, {
            method: 'DELETE',
        });
    }

    // Student endpoints
    async getStudents(): Promise<Student[]> {
        return this.request<Student[]>('/students');
    }

    async getStudent(id: number): Promise<Student> {
        return this.request<Student>(`/students/${id}`);
    }

    async createStudent(student: Student): Promise<Student> {
        return this.request<Student>('/students', {
            method: 'POST',
            body: JSON.stringify(student),
        });
    }

    async updateStudent(id: number, student: Student): Promise<Student> {
        return this.request<Student>(`/students/${id}`, {
            method: 'PUT',
            body: JSON.stringify(student),
        });
    }

    async deleteStudent(id: number): Promise<void> {
        return this.request<void>(`/students/${id}`, {
            method: 'DELETE',
        });
    }

    // Professor endpoints
    async getProfessors(): Promise<Professor[]> {
        return this.request<Professor[]>('/professors');
    }

    async getProfessor(id: number): Promise<Professor> {
        return this.request<Professor>(`/professors/${id}`);
    }

    async createProfessor(professor: Professor): Promise<Professor> {
        return this.request<Professor>('/professors', {
            method: 'POST',
            body: JSON.stringify(professor),
        });
    }

    async updateProfessor(id: number, professor: Professor): Promise<Professor> {
        return this.request<Professor>(`/professors/${id}`, {
            method: 'PUT',
            body: JSON.stringify(professor),
        });
    }

    async deleteProfessor(id: number): Promise<void> {
        return this.request<void>(`/professors/${id}`, {
            method: 'DELETE',
        });
    }

}

export const apiService = new ApiService();
