import React, { useEffect, useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAstronaut } from '../context/astronaut';
import { useTeam } from '../context/team';
import styled from 'styled-components';
import * as ROUTES from '../constants/routes';

const AddAstronaut = () => {
  const INITIAL_STATE = {
    name: '',
    bio: '',
    teamId: '1',
    image: ''
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'updateFieldValue':
        return {
          ...state,
          [action.field]: action.value
        };
      default:
        return INITIAL_STATE;
    }
  };
  const { addAstronaut } = useAstronaut();
  const { getAllTeams } = useTeam();
  const [teams, setTeams] = useState();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [preview, setPreview] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getAllTeams().then(teams => setTeams(teams));
  }, [getAllTeams]);

  const updateFieldValue = field => {
    return e => {
      if (e.target.files && e.target.files.length > 0) {
        setPreview(e.target.files[0]);
        dispatch({
          type: 'updateFieldValue',
          field,
          value: e.target.files[0]
        });
      } else {
        dispatch({
          type: 'updateFieldValue',
          field,
          value: e.target.value
        });
      }
    };
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let formData = new FormData();

    for(let i in state){
      formData.append(i, state[i])
    }

    addAstronaut(formData).then(res => {
      console.log('RES', res)
      if (res.success) navigate(ROUTES.HOME);
    });
  };

  return (
    <>
      <h1>Ajouter un astronaute</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Nom</label>
          <input type='text' name='name' value={state.name} onChange={updateFieldValue('name')} />
        </FormGroup>

        <FormGroup>
          <label>Bio</label>
          <textarea rows='10' name='bio' value={state.bio} onChange={updateFieldValue('bio')}></textarea>
        </FormGroup>

        <FormGroup>
          <label>Sélectionner une équipe</label>
          <select name='teamId' onChange={updateFieldValue('teamId')}>
            {teams?.map(team => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </FormGroup>

        <FormGroup>
          <label>Télécharger une image</label>
          <input type='file' accept='image/*' name='image' onChange={updateFieldValue('image')} />
        </FormGroup>

        {preview && <Preview src={URL.createObjectURL(preview)} alt='Thumb' />}

        <Button>Ajouter</Button>
      </Form>
    </>
  );
};

export default AddAstronaut;

// styles
const Preview = styled.img`
  max-width: 100%;
  max-height: 150px;
  margin-bottom: var(--spacing-m);
`;

const Form = styled.form`
  width: 100%;
  max-width: 700px;

  & input,
  textarea,
  select {
    width: 100%;
    padding: var(--spacing-s);
    border: 1px solid #7a7f80;
    border-radius: 5px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: var(--spacing-m);
`;

const Button = styled.button`
  width: 100%;
  max-width: 700px;
  padding: var(--spacing-s);
  background-color: var(--color-primary-darker);
  color: var(--color-white);
  text-transform: uppercase;
  border: none;
  outline: none;
  border-radius: 5px;
`;
