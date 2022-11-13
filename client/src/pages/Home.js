import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Home = () => {
  const [astronauts, setAstronauts] = useState();

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/astronauts')
      .then(res => res.json())
      .then(astronauts => setAstronauts(astronauts));
  }, []);

  return (
    <Section>
      <h1>Les astronautes</h1>
      <Grid>
        {astronauts?.map((astronaut, i) => (
          <Article key={i}>
            <Img src={astronaut.avatar} alt={astronaut.name} />
            <Content>
              <h2>{astronaut.name}</h2>
              <small>Team: {astronaut.team}</small>
              <Bio>{astronaut.bio}</Bio>
            </Content>
          </Article>
        ))}
      </Grid>
    </Section>
  );
};

export default Home;

//styles
const Section = styled.section`
  width: 100%;
`;

const Grid = styled.section`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(500px, max-content));
  justify-content: center;
  padding: 3rem 1rem;
`;

const Article = styled.article`
  width: 100%;
  display: flex;
  gap: 1rem;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-s);
`;

const Img = styled.img`
  max-width: 150px;
  max-height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  & h2 {
    margin-top: 5px;
    margin-bottom: 0;
  }
  & small {
    font-size: 0.8rem;
  }
`;

const Bio = styled.div`
  background-color: black;
  color: #83F52C;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  font-size: 0.6rem;
  padding: 5px;
`
