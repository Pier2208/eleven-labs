import { css } from 'styled-components';

const size = {
    xxs: 320,
    xs: 500,
    s: 750,
    m: 880,
    l: 1280,
    xl: 1920,
};

const media = Object.keys(size).reduce((acc, label) => {
    acc[label] = (...args) => css`
    @media (min-width: ${size[label]}px) {
      ${css(...args)}
    }
  `;
    return acc;
}, {});

export default media;