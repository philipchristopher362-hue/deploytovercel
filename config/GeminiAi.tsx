const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

const SYSTEM_PROMPT =
  "You are a creative children's story writer. Always respond with valid JSON only — no markdown, no code fences, no extra text. " +
  "The JSON must include: story_cover (with title and image_prompt), chapters (array of 5 objects each with chapter_title, chapter_text, image_prompt), " +
  "and a lesson object with a title (e.g. 'Lesson Learned') and a summary (2-3 sentences summarising the moral of the story).";

const history: { role: "user" | "assistant"; content: string }[] = [
  {
    role: "user",
    content:
      "create kids story on description for 5-8 Years kids, Educational story, and all images in Paper cut style: story of boy and girls and Love , give me 5 chapter, With detailed image text prompt for each of chapter and image prompt for story cover book with story name , all in JSON field format",
  },
  {
    role: "assistant",
    content: JSON.stringify({
      story_cover: {
        title: "The Boy, The Girl, and the Love",
        image_prompt:
          "Paper cut illustration of a boy and a girl holding hands, smiling, surrounded by colorful flowers and hearts.",
      },
      chapters: [
        {
          chapter_title: "A Sunny Day",
          chapter_text:
            "Once upon a time, in a town full of sunshine and laughter, lived a boy named Leo who loved to play by the river.",
          image_prompt:
            "Paper cut illustration of Leo and Lily building a sandcastle on a sunny beach with colorful seashells.",
        },
      ],
    }),
  },
];

/**
 * Wraps a Groq chat completion call in the same
 * chatSession.sendMessage() / result.response.text() interface
 * that the rest of the app expects from the old Gemini SDK.
 */
export const chatSession = {
  sendMessage: async (prompt: string) => {
    const messages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...history,
      { role: "user" as const, content: prompt },
    ];

    const res = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 1,
        max_tokens: 8192,
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Groq API error ${res.status}: ${err}`);
    }

    const data = await res.json();
    const text: string = data.choices[0].message.content ?? "";

    // Mirror the Gemini SDK shape: result.response.text()
    return {
      response: {
        text: () => text,
      },
    };
  },
};
