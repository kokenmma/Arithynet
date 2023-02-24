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
  const [replaced, setReplaced] = useState<string>('');
  useEffect(() => {
    // replace tikz code block to image
    console.log(content);
    const regex = /\\begin{tikzpicture}(.*?)\\end{tikzpicture}/ms;
    let index = 0;
    while (content.match(regex) !== null) {
      const replaceContent = images.length > index ? `![SVG](${images[index]})` : '';
      content = content.replace(regex, replaceContent);
    }
    setReplaced(content);
  }, [content]);
  return (
    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
      {replaced}
    </ReactMarkdown>
  );
};

export default RenderContent;
