import { SearchEngine } from '../types';

export function substituteTarget(rawQuery: string, targetDomain: string): string {
  const cleanTarget = targetDomain.trim();
  if (!cleanTarget) {
    return rawQuery;
  }
  // Replace [TARGET], [target], *.target.com
  let result = rawQuery
    .replace(/\[TARGET\]/g, cleanTarget)
    .replace(/\[target\]/g, cleanTarget)
    .replace(/\*\.target\.com/g, `*.${cleanTarget}`);

  return result;
}

export function getSearchUrl(query: string, engine: SearchEngine): string {
  const encoded = encodeURIComponent(query);
  switch (engine) {
    case 'google':
      return `https://www.google.com/search?q=${encoded}`;
    case 'duckduckgo':
      return `https://duckduckgo.com/?q=${encoded}`;
    case 'bing':
      return `https://www.bing.com/search?q=${encoded}`;
    case 'yahoo':
      return `https://search.yahoo.com/search?p=${encoded}`;
    default:
      return `https://www.google.com/search?q=${encoded}`;
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}
