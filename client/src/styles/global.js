import { createGlobalStyle } from 'styled-components';
import '@fontsource/audiowide';

const GlobalStyle = createGlobalStyle`
    :root {
        box-sizing: border-box;
        font-size: 0.9rem;
        --color-primary: #2188E4;
        --color-primary-darker: #1A6CB6;
        --color-secondary: #83f52c;
        --color-error: #cc0000;
        --color-success: #4BB543;
        --color-disabled: #d3d3d3;
        
        --color-grey-light: #F1F1F1;
        --color-white: #FFFFFF;
        --color-black: #000;
        --font: 'Audiowide', cursive;;
        --spacing-s: 0.5rem;
        --spacing-m: 1.5rem;
        --spacing-l: 3rem;
        --spacing-xl: 5rem;
        --box-shadow-btn: 0px 3px 12px rgba(0, 0, 0, 0.2);
        --max-width: 1380px;
        --max-content: 980px;
/* RYTHME VERTICAL */
section + section,
button + button {
  margin-top: var(--spacing-m);
}
section {
  padding: var(--spacing-l) 0;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
body {
    margin: 0;
    padding: 0;
    line-height: 1.4;
    font-family: var(--font);
  }
h1, h2, h3 {
  color: var(--color-heading);
  font-weight: 400;
  font-size: 20px;
}
// Adaptation de la police
@media (min-width: 500px) {
    :root {
      font-size: 0.9rem;
    }
    h1 {
      font-size: 1.6rem;
      font-weight: bold;
    }
    h2 {
      font-size: 1.25rem;
      font-weight: bold;
    }
  }
  @media (min-width: 750px) {
    :root {
      font-size: 1.1rem;
    }
    h1 {
      font-size: 1.5rem;
    }
  }
  @media (min-width: 980px) {
    :root {
      font-size: 1.2rem;
    }
    h1 {
      font-size: 1.8rem;
      line-height: 1.4;
    }
  }
  @media (min-width: 1180px) {
    :root {
      font-size: 1.2rem;
    }
    h1 {
      font-size: 2rem;
      line-height: 1.4;
    }
  }
  @media (min-width: 1380px) {
    :root {
      font-size: 1.2rem;
    }
    h1 {
      font-size: 2.2rem;
      line-height: 1.4;
    }
  }
  @media (min-width: 1900px) {
    :root {
      font-size: 1.2rem;
    }
  }
}
a {
  text-decoration: none;
  color: var(--color-white) ;
}
img {
  display: block;
  max-width: 100%;
  object-fit: cover;
}
`;

export default GlobalStyle;