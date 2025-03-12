import { useState, useEffect } from 'react';
import axios from 'axios';

const useAgent = (file: File | null, transcript: string | null) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!file && !transcript) return;

            setLoading(true);
            setError(null);

            try {
                let response;
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);

                    response = await axios.post('http://127.0.0.1:4000/agent/pdf', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        timeout: 30000, // 30 seconds
                    });
                } else if (transcript) {
                    response = await axios.post('http://127.0.0.1:4000/agent/txt', { transcript }, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        timeout: 30000, // 30 seconds
                    });
                }

                setData(response?.data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [file, transcript]);

    return { data, error, loading };
};

export default useAgent;