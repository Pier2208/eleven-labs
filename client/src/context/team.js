import { createContext, useContext } from 'react';

/**
 * Création du contexte Team
 */
const TeamContext = createContext();

/**
 * Création du Provider Team
 */
export const TeamProvider = ({ children }) => {
  const getAllTeams = async () => {
    const res = await fetch('http://localhost:8080/api/v1/teams')
    return res.json()
  };

  return (
    <TeamContext.Provider
      value={{
        getAllTeams
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

/**
 * Hook pour appeler les différentes méthodes et offertes par le Provider
 */
export const useTeam = () => {
  return useContext(TeamContext);
};
