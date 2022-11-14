import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAstronaut } from '../context/astronaut';
import EditButton from '../assets/editButton.svg';
import DeleteButton from '../assets/deleteButton.svg';
import * as ROUTES from '../constants/routes';

const Home = () => {
  const [astronauts, setAstronauts] = useState();
  const { getAllAstronauts, deleteAstronaut } = useAstronaut();

  useEffect(() => {
    getAllAstronauts().then(astronauts => setAstronauts(astronauts));
  }, [getAllAstronauts, astronauts]);

  return (
    <Section>
      <h1>Les astronautes</h1>
      {!astronauts?.length && <p>Il n'y a aucun astronaute pour le moment.</p>}
      <Grid>
        {astronauts?.map((astronaut, i) => (
          <Article key={i}>
            <Img src={astronaut.avatar} alt={astronaut.name} />
            <Content>
              <h2>{astronaut.name}</h2>
              <small>Team: {astronaut.team}</small>
              <Bio>{astronaut.bio}</Bio>
            </Content>
            <ActionButtons>
              <Link to={`${ROUTES.EDIT}${astronaut.id}`}>
                <EditIcon src={EditButton} alt='Éditer un astronaute' />
              </Link>
              <DeleteIcon onClick={() => deleteAstronaut(astronaut.id)} src={DeleteButton} alt='Supprimer un astronaute' />
            </ActionButtons>
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

const ActionButtons = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  opacity: 0;
  transition: opacity 250ms;
  display: flex;
  & > * {
    margin-left: 5px;
  }
`;

const EditIcon = styled.img`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const DeleteIcon = styled(EditIcon)`
  color: var(--color-error);
`;

const Article = styled.article`
  width: 100%;
  display: flex;
  gap: 1rem;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-s);
  position: relative;

  &:hover ${ActionButtons} {
    opacity: 1;
  }
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
  background-color: var(--color-black);
  color: var(--color-secondary);
  width: 100%;
  height: 100%;
  border-radius: 5px;
  font-size: 0.6rem;
  padding: 5px;
`;
