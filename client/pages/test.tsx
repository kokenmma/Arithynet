import React, { useEffect } from 'react';
import { getPosts } from '../services/PostService';

const Sample = () => {
  useEffect(() => {
    getPosts().then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};

export default Sample;
