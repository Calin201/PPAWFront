import { useState, useCallback } from 'react';

interface UseApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    execute: (...args: any[]) => Promise<void>;
}

export function useApi<T>(apiFunction: (...args: any[]) => Promise<T>): UseApiResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const execute = useCallback(async (...args: any[]) => {
        try {
            setLoading(true);
            setError(null);
            const result = await apiFunction(...args);
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred'));
        } finally {
            setLoading(false);
        }
    }, [apiFunction]);

    return { data, loading, error, execute };
}
