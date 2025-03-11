"use client"
import React, { useState } from 'react';
import useAgent from '../../hooks/useAgent';

const Page1 = () => {
    const [file, setFile] = useState<File | null>(null);
    const [transcript, setTranscript] = useState<string | null>(null);
    const { data, error, loading } = useAgent(file, transcript);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleTranscriptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTranscript(event.target.value);
    };

    return (
        <div>
            <h1>Test useAgent Hook</h1>
            <div>
                <input type="file" onChange={handleFileChange} />
            </div>
            <div>
                <textarea placeholder="Enter transcript" onChange={handleTranscriptChange}></textarea>
            </div>
            <div>
                <button onClick={() => useAgent(file, transcript)}>Submit</button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
};

export default Page1;