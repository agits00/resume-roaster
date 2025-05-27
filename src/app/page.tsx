// Resume Roaster React Frontend with AdSense and Google Analytics

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Declare global for adsbygoogle to satisfy TypeScript
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function ResumeRoaster() {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Google Analytics script
    const gaScript = document.createElement('script');
    gaScript.setAttribute('async', '');
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(gaScript);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `;
    document.head.appendChild(inlineScript);
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('resume', file);

    const res = await fetch("https://cv-judge.onrender.com/api/roast", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResponse(data.feedback);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <Card>
        <CardContent className="space-y-4">
          <h1 className="text-2xl font-bold">Resume Roaster</h1>
          <p>Upload your resume and get an honest, AI-powered critique.</p>

          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]);
              }
            }}
          />

          <Button onClick={handleUpload} disabled={loading}>
            {loading ? "Roasting..." : "Roast my Resume"}
          </Button>

          {response && (
            <>
              <Textarea
                className="w-full h-60"
                value={response}
                readOnly
              />

              {/* Google AdSense Ad Unit */}
              <div className="mt-6">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block', textAlign: 'center' }}
                  data-ad-client="ca-pub-6587616669428556"
                  data-ad-slot="1234567890"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
                <script>
                  {(window.adsbygoogle = window.adsbygoogle || []).push({})}
                </script>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
