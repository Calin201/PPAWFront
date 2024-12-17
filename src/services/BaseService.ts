import axiosInstance from './api/axiosConfig';

export class BaseService<T> {
    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    async getAll(): Promise<T[]> {
        const response = await axiosInstance.get<T[]>(this.endpoint);
        return response.data;
    }

    async getById(id: number | string): Promise<T> {
        const response = await axiosInstance.get<T>(`${this.endpoint}/${id}`);
        return response.data;
    }

    async create(data: Partial<T>): Promise<T> {
        const response = await axiosInstance.post<T>(this.endpoint, data);
        return response.data;
    }

    async update(id: number | string, data: Partial<T>): Promise<T> {
        const response = await axiosInstance.put<T>(`${this.endpoint}/${id}`, data);
        return response.data;
    }

    async delete(id: number | string): Promise<void> {
        await axiosInstance.delete(`${this.endpoint}/${id}`);
    }
}
