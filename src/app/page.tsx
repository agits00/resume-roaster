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
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-HFXJXFR0FZ';
    document.head.appendChild(gaScript);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-HFXJXFR0FZ');
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
      <Card className="shadow-xl border border-orange-300">
        <CardContent className="space-y-6 p-6">
          <h1 className="text-4xl font-bold text-center text-orange-600">
            🔥 Resume Roaster 🔥
          </h1>
          <p className="text-center text-gray-700">
            Upload your resume and get a brutally honest, AI-powered critique. No fluff — just 🔥 feedback.
          </p>

          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            className="border-orange-400 focus:border-orange-600"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]);
              }
            }}
          />

          <Button
            onClick={handleUpload}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 w-full"
          >
            {loading ? "🔥 Roasting..." : "Roast My Resume"}
          </Button>

          {response && (
            <>
              <div>
                <h2 className="text-lg font-semibold text-orange-700 mb-2">
                  📣 Here&apos;s what the AI thinks:
                </h2>
                <Textarea
                  className="w-full h-60 text-sm border border-orange-300 bg-orange-50"
                  value={response}
                  readOnly
                />
              </div>

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
