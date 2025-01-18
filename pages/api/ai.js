export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { prompt } = req.body;

        try {
            const response = await fetch('http://localhost:1234/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    { 
                        "model": "TheBloke/dolphin-2.7-mixtral-8x7b-GGUF",
                        "messages": [ 
                          { "role": "system", "content": "Answer as a stock manager for a logistics company." },
                          { "role": "user", "content": prompt }
                        ], 
                        "temperature": 0.7, 
                        "max_tokens": -1,
                        "stream": false
                    }
                ),
            });

            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            console.error('Error communicating with AI model:', error);
            res.status(500).json({ error: 'Failed to communicate with AI model' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}