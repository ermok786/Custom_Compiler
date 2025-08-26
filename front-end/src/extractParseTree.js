// src/extractParseTree.js

export function extractParseTreeFromOutput(outputText) {
  const marker = 'Parse Tree (JSON):';
  const jsonStart = outputText.indexOf(marker);
  if (jsonStart === -1) return null;

  // Grab the JSON part after the marker
  const jsonPart = outputText.substring(jsonStart + marker.length).trim();

  // Try to find a full JSON block
  const jsonMatch = jsonPart.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;

  let jsonText = jsonMatch[0];

  // ✅ Fix invalid double-double quotes (e.g., ""hi"") ➝ "hi"
  jsonText = jsonText.replace(/""([^"]*?)""/g, '"$1"');

  try {
    return JSON.parse(jsonText);
  } catch (err) {
    console.error('❌ Failed to parse corrected tree JSON:', err);
    return null;
  }
}
