export const getImages = async (content: string): Promise<string[]> => {
  const images: string[] = [];

  while (true) {
    const tikz_begin_index = content.indexOf('$$\\begin{tikzpicture}');
    const tikz_end_index = content.indexOf('\\end{tikzpicture}$$');
    if (tikz_begin_index === -1) {
      return images;
    }
    images.push(
      await tikz2svg(
        content.substring(
          tikz_begin_index + '$$'.length,
          tikz_end_index + '\\end{tikzpicture}'.length
        )
      )
    );
  }
};

export const tikz2svg = async (tikzcode: string): Promise<string> => {
  const response = await fetch(new URL(process.env.NEXT_PUBLIC_TIKZ_TO_SVG_SERVER_URL as string), {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: tikzcode,
  });

  return response.json().then(
    (json) => json.location,
    () => {
      console.log('tikz2svg(): API Error!');
    }
  );
};
