import { createContext, useContext } from 'react';

/**
 * Création du contexte Astronaut
 */
const AstronautContext = createContext();

/**
 * Création du Provider astronaut
 */
export const AstronautProvider = ({ children }) => {
  const getAllAstronauts = async () => {
    const res = await fetch('http://localhost:8080/api/v1/astronauts');
    return res.json();
  };

  const addAstronaut = async formData => {
    const res = await fetch('http://localhost:8080/api/v1/astronauts', {
      method: 'POST',
      body: formData
    });
    return res.json();
  };

  return (
    <AstronautContext.Provider
      value={{
        getAllAstronauts,
        addAstronaut
      }}
    >
      {children}
    </AstronautContext.Provider>
  );
};

/**
 * Hook pour appeler les différentes méthodes et offertes par le Provider
 */
export const useAstronaut = () => {
  return useContext(AstronautContext);
};
