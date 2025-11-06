export class Advocate {
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    specialties: string[];
    yearsOfExperience: number;
    phoneNumber: number;

    constructor(init: Partial<Advocate>) {
        this.firstName = init?.firstName || '';
        this.lastName = init?.lastName || '';
        this.city = init?.city || '';
        this.degree = init?.degree || '';
        this.specialties = init?.specialties || [];
        this.yearsOfExperience = init?.yearsOfExperience || 0;
        this.phoneNumber = init?.phoneNumber || 0;
    }
}