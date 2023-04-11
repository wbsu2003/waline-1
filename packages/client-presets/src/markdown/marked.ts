import { marked } from 'marked';

import { markedTexExtensions } from './markedMathExtension.js';
import {
  type WalineHighlighter,
  type WalineTexRenderer,
} from '../typings/index.js';

export interface ParseMarkdownOptions {
  highlighter: WalineHighlighter | false;
  texRenderer: WalineTexRenderer | false;
}

export const parseMarkdown = (
  content: string,
  { highlighter, texRenderer }: ParseMarkdownOptions
): string => {
  marked.setOptions({
    highlight: highlighter || undefined,
    breaks: true,
    smartLists: true,
    smartypants: true,
  });

  if (texRenderer) {
    const extensions = markedTexExtensions(texRenderer);

    marked.use({ extensions });
  }

  return marked.parse(content);
};
