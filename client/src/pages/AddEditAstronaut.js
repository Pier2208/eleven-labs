import React, { useEffect, useState, useReducer } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAstronaut } from '../context/astronaut';
import { useTeam } from '../context/team';
import { ASTRONAUT_INITIAL_STATE, astronautReducer } from '../reducers/astronautReducer';
import styled from 'styled-components';
import * as ROUTES from '../constants/routes';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';

const AddAstronaut = () => {

  const { addAstronaut, getAstronautById, editAstronaut } = useAstronaut();
  const { getAllTeams } = useTeam();
  const [teams, setTeams] = useState();
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(astronautReducer, ASTRONAUT_INITIAL_STATE);
  const [preview, setPreview] = useState();
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const location = useLocation();
  let { id: astronautId } = useParams();

  // fetch all teams
  useEffect(() => {
    getAllTeams().then(teams => setTeams(teams));
  }, [getAllTeams]);

  // set edit or add mode
  useEffect(() => {
    if (location.pathname.includes('edit')) {
      setEditing(true);
      getAstronautById(astronautId).then(astronaut => {
        let editAstronaut = (({ name, bio, teamid: teamId }) => ({ name, bio, teamId }))(astronaut);
        for (let field in editAstronaut) {
          dispatch({
            type: 'updateFieldValue',
            field,
            value: editAstronaut[field]
          });
        }
        setPreview(astronaut.avatar);
      });
    } else {
      setEditing(false);
      for (let field in state) {
        dispatch({
          type: 'resetField',
          field
        });
      }
      setPreview();
    }
  }, [location]);

  // handle input change
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

  // handle form submit
  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    let formData = new FormData();

    for (let i in state) {
      formData.append(i, state[i]);
    }

    if (editing) {
      editAstronaut(astronautId, formData).then(res => {
        if (res.err) {
          setFormErrors(res.err);
          setLoading(false);
          return;
        }
        if (res.success) navigate(ROUTES.HOME);
        setFormErrors({});
        setLoading(false);
      });
    } else {
      addAstronaut(formData).then(res => {
        if (res.err) {
          setFormErrors(res.err);
          setLoading(false);
          return;
        }
        if (res.success) navigate(ROUTES.HOME);
        setFormErrors({});
        setLoading(false);
      });
    }
  };

  return (
    <Section>
      {loading && <Loader />}
      <h1>{editing ? 'Editer' : 'Ajouter'} un astronaute</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Nom</label>
          <input type='text' name='name' value={state.name} onChange={updateFieldValue('name')} />
          <Error>{formErrors?.name}</Error>
        </FormGroup>

        <FormGroup>
          <label>Bio</label>
          <textarea rows='10' name='bio' value={state.bio} onChange={updateFieldValue('bio')}></textarea>
        </FormGroup>

        <FormGroup>
          <label>Sélectionner une équipe</label>
          <select name='teamId' onChange={updateFieldValue('teamId')} value={state.teamId}>
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

        {preview instanceof File ? <Preview src={URL.createObjectURL(preview)} alt='Thumb' /> : <Preview src={preview} />}

        <Button>{editing ? 'Editer' : 'Ajouter'}</Button>
      </Form>
    </Section>
  );
};

export default AddAstronaut;

// styles
const Preview = styled.img`
  max-width: 100%;
  max-height: 150px;
  margin-bottom: var(--spacing-m);
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary);
  }
`;
