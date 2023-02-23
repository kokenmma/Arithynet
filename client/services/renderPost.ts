/*
const tm = require('markdown-it-texmath');
const md = require('markdown-it')({ html: true }).use(tm, {
  engine: require('katex'),
  delimiters: 'dollars',
});

const tikzToSvg = async (tikzcode: string): Promise<string> => {
  const response = await fetch(new URL(process.env.NEXT_PUBLIC_TIKZ_TO_SVG_SERVER_URL as string), {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: tikzcode,
  });

  return response.json().then((json) => json.code);
};
*/

const renderPost = (postText: string) => {};

export default renderPost;
