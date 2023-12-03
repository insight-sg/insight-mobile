import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

export const NoteLoader = ({ width }: { width: number }) => (
  <ContentLoader
    speed={2}
    width={width}
    height={700}
    viewBox="0 0 363 700"
    backgroundColor="#d0867e"
    foregroundColor="#ffe4dd"
  >
    <Rect x="8" y="8" rx="10" ry="10" width="150" height="115" />
    <Rect x="190" y="8" rx="10" ry="10" width="150" height="115" />
    <Rect x="8" y="139" rx="10" ry="10" width="150" height="115" />
    <Rect x="190" y="139" rx="10" ry="10" width="150" height="115" />
    <Rect x="8" y="270" rx="10" ry="10" width="150" height="115" />
    <Rect x="190" y="270" rx="10" ry="10" width="150" height="115" />
    <Rect x="8" y="401" rx="10" ry="10" width="150" height="115" />
    <Rect x="190" y="401" rx="10" ry="10" width="150" height="115" />
    <Rect x="8" y="532" rx="10" ry="10" width="150" height="115" />
    <Rect x="190" y="532" rx="10" ry="10" width="150" height="115" />
  </ContentLoader>
);
