export interface Address {
    id?: number;
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
}

export interface Person {
    id?: number;
    firstName: string;
    lastName: string;
    age?: number;
    email: string;
    purchaseParkingPass?: boolean;
    address?: Address;
}

export interface Student extends Person {
    studentNumber: string;
    averageMark?: number;
    isEligibleToEnroll?: boolean;
}

export interface Professor extends Person {
    salary: number;
}

export type PersonType = 'person' | 'student' | 'professor';

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}
