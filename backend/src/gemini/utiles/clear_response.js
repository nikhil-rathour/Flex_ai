export const cleanJsonResponse = (response) => {
  let cleaned = response.trim();

  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '');
  cleaned = cleaned.replace(/\s*```$/i, '');
  cleaned = cleaned.trim();


  const firstBrace = cleaned.indexOf('{');
  if (firstBrace !== -1) {
    let braceCount = 0;
    let lastBrace = -1;

    for (let i = firstBrace; i < cleaned.length; i++) {
      if (cleaned[i] === '{') {
        braceCount++;
      } else if (cleaned[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          lastBrace = i;
          break;
        }
      }
    }

    if (lastBrace !== -1) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }
  }

  return cleaned.trim();
};

const decodeTolerantJsonString = (source, startIndex) => {
  let value = '';

  for (let i = startIndex; i < source.length; i++) {
    const ch = source[i];

    if (ch === '"') {
      return { value, endIndex: i + 1 };
    }

    if (ch !== '\\') {
      value += ch;
      continue;
    }

    const next = source[i + 1];
    if (next === undefined) {
      value += '\\';
      continue;
    }

    switch (next) {
      case '"':
        value += '"';
        i++;
        break;
      case '\\':
        value += '\\';
        i++;
        break;
      case '/':
        value += '/';
        i++;
        break;
      case 'b':
        value += '\b';
        i++;
        break;
      case 'f':
        value += '\f';
        i++;
        break;
      case 'n':
        value += '\n';
        i++;
        break;
      case 'r':
        value += '\r';
        i++;
        break;
      case 't':
        value += '\t';
        i++;
        break;
      case 'u': {
        const unicodeHex = source.slice(i + 2, i + 6);
        if (/^[\dA-Fa-f]{4}$/.test(unicodeHex)) {
          value += String.fromCharCode(parseInt(unicodeHex, 16));
          i += 5;
        } else {
          value += '\\u';
          i++;
        }
        break;
      }
      default:
        // Preserve malformed escapes so generated JS source is not lost.
        value += `\\${next}`;
        i++;
        break;
    }
  }

  return null;
};

const extractStringField = (source, fieldName) => {
  let keyIndex = source.indexOf(`"${fieldName}"`);

  while (keyIndex !== -1) {
    let cursor = keyIndex + fieldName.length + 2;

    while (cursor < source.length && /\s/.test(source[cursor])) cursor++;
    if (source[cursor] !== ':') {
      keyIndex = source.indexOf(`"${fieldName}"`, keyIndex + 1);
      continue;
    }

    cursor++;
    while (cursor < source.length && /\s/.test(source[cursor])) cursor++;
    if (source[cursor] !== '"') {
      keyIndex = source.indexOf(`"${fieldName}"`, keyIndex + 1);
      continue;
    }

    return decodeTolerantJsonString(source, cursor + 1);
  }

  return null;
};

const normalizeRawCodeResponse = (response) => {
  let cleaned = response.trim();
  cleaned = cleaned.replace(/^```(?:javascript|js|jsx)?\s*/i, '');
  cleaned = cleaned.replace(/\s*```$/i, '').trim();
  return cleaned;
};

export const parseGeminiCodeResponse = (responseText) => {
  const cleanedResponse = cleanJsonResponse(responseText);

  try {
    return {
      parsed: JSON.parse(cleanedResponse),
      usedFallback: false
    };
  } catch (jsonParseError) {
    const codeField = extractStringField(cleanedResponse, 'code');

    if (codeField?.value) {
      const componentNameField = extractStringField(cleanedResponse, 'component_name');
      return {
        parsed: {
          output: {
            component_name: componentNameField?.value || 'GeneratedSPA',
            code: codeField.value
          }
        },
        usedFallback: true
      };
    }

    const normalizedRaw = normalizeRawCodeResponse(responseText);
    if (/\bfunction\s+GeneratedSPA\b/.test(normalizedRaw)) {
      return {
        parsed: {
          output: {
            component_name: 'GeneratedSPA',
            code: normalizedRaw
          }
        },
        usedFallback: true
      };
    }

    throw jsonParseError;
  }
};
