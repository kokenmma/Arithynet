import React from 'react';
import { NextPage } from 'next';
/** @ts-ignore **/
import ReactHtmlParser from 'react-html-parser';

/*
var md = require('markdown-it')(),
  mk = require('markdown-it-katex');

md.use(mk);
*/

import 'katex/dist/katex.min.css';
/** @ts-ignore **/
import MarkdownIt from 'markdown-it';
/** @ts-ignore **/
import mk from 'markdown-it-katex';

/* 
const tm = require('markdown-it-texmath');
const md = require('markdown-it')({ html: true }).use(tm, {
  engine: require('katex'),
  delimiters: 'dollars',
});
*/

interface RenderContentProps {
  content: string;
  images: string[];
}

const RenderPost: NextPage<RenderContentProps> = React.memo<RenderContentProps>(
  function RenderContentImpl({ content, images = [] }: RenderContentProps): JSX.Element {
    const md = new MarkdownIt({
      langPrefix: 'lang-',
      preset: 'default',
      linkify: true,
      breaks: true,
      html: true,
      typegraphy: true,
    });

    md.use(mk);
    let last_index = 0;
    let image_index = 0;

    console.log('content: ', content);
    console.log('rendered_content: ', md.render(content));

    return <>{ReactHtmlParser(md.render(content))}</>;

    /*
  while (true) {
    const tikz_begin_index = content.indexOf('$$\\begin{tikzpicture}');
    const tikz_end_index = content.indexOf('\\end{tikzpicture}$$');
    if (tikz_begin_index === -1) {
      content =
        content.substring(0, last_index) + md.render(content.substring(last_index, content.length));
      return <>{ReactHtmlParser(content)}</>;
    }
    const newly_rendered_content =
      md.render(content.substring(last_index, tikz_begin_index)) +
      `<img src="${images[image_index++]}" />`;
    content =
      content.substring(0, last_index) +
      newly_rendered_content +
      content.substring(tikz_end_index + '\\end{tikzpicture}$$'.length, content.length);
    last_index += newly_rendered_content.length;
  }
  */
  }
);

export default RenderPost;
