import { useState } from 'react';

interface EmailAnalysis {
  email: {
    body: string;
    subject: string;
  };
}

export const useEmailAnalysis = () => {
  const [emailData, setEmailData] = useState<EmailAnalysis | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeEmail = async (context: any) => {
    if (!context || loading) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Extract the relevant information from context
      const emailContext = {
        information: {
          transcript: context.transcript,
          summary: context.notes?.summary || "",
          topics: context.notes?.importantTopics || [],
          actions: context.notes?.actionItems || [],
          sentiment: context.sentiment?.overall || "neutral",
          participants: context.participants || []
        }
      };
      
      console.log('Sending context to email analysis:', emailContext);
      
      const response = await fetch('http://127.0.0.1:4000/agent/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailContext)
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        throw new Error(`Failed to analyze email: ${response.status} ${responseText}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error('Invalid response format from server');
      }

      if (!data?.email?.subject || !data?.email?.body) {
        console.error('Invalid data structure:', data);
        throw new Error('Invalid response structure from server');
      }

      setEmailData(data);
      return data;
    } catch (err) {
      console.error('Email analysis error:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    emailData,
    error,
    loading,
    analyzeEmail
  };
};
