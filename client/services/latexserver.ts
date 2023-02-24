import axios from 'axios';
export const getImages = async (content: string): Promise<string[]> => {
  console.log("Called");
  const images: string[] = [];
  const regex = /\\begin{tikzpicture}.*?\\end{tikzpicture}/ms;
  while (content.match(regex) !== null) {
    const tikz = content.match(regex);
    if (tikz === null) break;
    images.push(await tikz2svg(tikz[0]));
    content = content.replace(regex, '');
  }
  return images;
};

export const tikz2svg = async (tikzcode: string): Promise<string> => {
  try {
    const response = (await axios.post(process.env.NEXT_PUBLIC_TIKZ_TO_SVG_SERVER_URL as string, tikzcode)).data;
    return response.location;
  } catch (e: any) {
    throw new Error(e);
  }
};
