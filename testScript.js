
async function main() {

  const ai = new GoogleGenAI({
    apiKey: process.env['GEMINI_API_KEY'],
  });
  const ThinkingLevel = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high"
};

  const config = { //2
    thinkingConfig: {
      thinkingLevel: ThinkingLevel.HIGH,
    },
  };

  const model = 'gemini-3-flash-preview'; //1

  const contents = [//3
    {
      role: 'user',
      parts: [
        {
          text: `Quel est la capital de la Côte d'ivoire ?      `,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,//1
    config,//2
    contents,//3
  });





  let fileIndex = 0;
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();