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
import { getDownloadURL, ref } from "firebase/storage";
import { firestorage } from '../services/firebase';

interface RenderContentProps {
  content: string;
  images: string[];
}

const RenderContent = ({ content, images = [] }: RenderContentProps) => {
  const [replaced, setReplaced] = useState<string>('');
  useEffect(() => {
    (async()=>{
    // replace tikz code block to image
    const regex = /\\begin{tikzpicture}(.*?)\\end{tikzpicture}/ms;
    let index = 0;
    while (content.match(regex) !== null) {
      const gsReference = ref(
        firestorage,
        "gs://arithynet.appspot.com/661b71486190e846f48823f555d0f488b04332db08cb960db672a7b4179c500f.svg"
      );
      const url = await getDownloadURL(gsReference);
      console.log(url);
      const replaceContent = images.length > index ? `![SVG](${images[index]}?sanitize=true)` : '';
      content = content.replace(regex, replaceContent);
    }
    setReplaced(content);
  })()
  }, [content]);
  return (
    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
      {replaced}
    </ReactMarkdown>
  );
};

export default RenderContent;
