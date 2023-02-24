import { unified } from 'unified';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import ReactMarkdown from 'react-markdown';
import { remark } from 'remark';
/** @ts-ignore **/
import ReactHtmlParser from 'react-html-parser';
import { useEffect, useState } from 'react';

// import katex css
import 'katex/dist/katex.min.css';

interface RenderContentProps {
  content: string;
  images: string[];
}

const RenderContent = ({ content, images = [] }: RenderContentProps) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
      {content}
    </ReactMarkdown>
  );
};

export default RenderContent;
