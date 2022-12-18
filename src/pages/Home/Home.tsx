import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  retrieveAuthorizationCode,
  getClickUpAuthorizedTeams,
  getSpaces,
  getFolders,
} from '../../features/clickup-slice';
import { LoginButton } from '../../components';
import { AppDispatch } from '../../store';

type ClickUpState = {
  clickUp: {
    accessToken: string;
    authorizedTeams: any;
    spaces: any;
  };
};

const Home = () => {
  const [searchParams] = useSearchParams();
  const userCode: string = searchParams.get('code') ?? '';
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken, authorizedTeams, spaces } = useSelector(
    (state: ClickUpState) => state?.clickUp
  );

  useEffect(() => {
    if (!accessToken) {
      dispatch(retrieveAuthorizationCode(userCode));
    }
    if (authorizedTeams.length === 0) {
      dispatch(getClickUpAuthorizedTeams());
    }
    if (spaces.length === 0) {
      dispatch(getSpaces());
    }
    dispatch(getFolders());
  }, [userCode, accessToken, authorizedTeams]);

  return (
    <>
      <h1>Home</h1>
      <LoginButton />
      <h2>{`Code: ${userCode}`}</h2>
      <h2>Teams:</h2>
      <ul>
        {authorizedTeams &&
          authorizedTeams.map((team: { id: string; name: string }) => {
            {
              const { id, name } = team;
              return (
                <li key={id}>
                  team id: {id}
                  <br />
                  team name: {name}
                  <hr />
                </li>
              );
            }
          })}
      </ul>
      <h2>spaces:</h2>
      <ul>
        {spaces &&
          spaces.map(
            ({
              spaceId,
              spaceName,
            }: {
              spaceId: string;
              spaceName: string;
            }) => {
              {
                return (
                  <li key={spaceId}>
                    space id: {spaceId}
                    <br />
                    space name: {spaceName}
                    <hr />
                  </li>
                );
              }
            }
          )}
      </ul>
    </>
  );
};
export default Home;
