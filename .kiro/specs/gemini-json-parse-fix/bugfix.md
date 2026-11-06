# Bugfix Requirements Document

## Introduction

The `GenerateStory` function in `app/create-story/page.tsx` fails intermittently with `SyntaxError: JSON.parse: unexpected non-whitespace character after JSON data`. Despite configuring Gemini with `responseMimeType: "application/json"`, the model sometimes wraps the JSON output in markdown code fences (e.g., ` ```json ... ``` `), leaving extra content after the JSON payload that causes `JSON.parse` to throw. The same raw response text is also passed unsanitized to `JSON.parse` inside `SaveInDB`, so both call sites are affected. This prevents story generation from completing and surfaces a generic "Server Error, Try again" to the user.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the Gemini API response text is wrapped in markdown code fences (e.g., ` ```json\n{...}\n``` `) THEN the system throws `SyntaxError: JSON.parse: unexpected non-whitespace character after JSON data` in `GenerateStory`

1.2 WHEN the raw Gemini response text contains any non-JSON prefix or suffix content THEN the system fails to parse the story and the catch block surfaces a generic "Server Error, Try again" toast to the user

1.3 WHEN `SaveInDB` receives the raw Gemini response text that includes markdown code fences or other surrounding content THEN the system throws a `SyntaxError` because `JSON.parse(output)` receives unsanitized input

### Expected Behavior (Correct)

2.1 WHEN the Gemini API response text is wrapped in markdown code fences THEN the system SHALL strip the fences and any surrounding whitespace before parsing, successfully extracting the JSON object

2.2 WHEN the raw Gemini response text contains any non-JSON prefix or suffix content THEN the system SHALL sanitize the text to isolate the JSON payload and parse it without error

2.3 WHEN `SaveInDB` receives raw Gemini response text THEN the system SHALL apply the same sanitization logic before calling `JSON.parse`, ensuring consistent and safe parsing at both call sites

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the Gemini API response text is already valid JSON with no surrounding content THEN the system SHALL CONTINUE TO parse it correctly and proceed with story generation

3.2 WHEN a valid story JSON is parsed successfully THEN the system SHALL CONTINUE TO generate the cover image, save the story to the database, deduct the user credit, and redirect to the story view page

3.3 WHEN the Gemini API returns a genuinely malformed or incomplete JSON payload THEN the system SHALL CONTINUE TO catch the parse error and display the "Server Error, Try again" toast to the user
