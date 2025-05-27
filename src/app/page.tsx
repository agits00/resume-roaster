// Resume Roaster React Frontend

'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('resume', file);
    setLoading(true);
    try {
      const res = await fetch('https://https://cv-judge.onrender.com/api/roast', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setFeedback(data.feedback);
    } catch {
      setFeedback('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-center">Resume Roaster 🔥</h1>
      <p className="text-center mb-6 max-w-xl text-gray-600">
        Upload your resume and get brutally honest feedback powered by AI.
      </p>
      <Card className="w-full max-w-xl">
        <CardContent className="p-6 space-y-4">
          <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <Button onClick={handleUpload} disabled={!file || loading}>
            {loading ? 'Roasting...' : 'Roast My Resume'}
          </Button>
          {feedback && (
            <div className="mt-4 p-4 border rounded bg-white text-sm whitespace-pre-wrap">
              {feedback}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
