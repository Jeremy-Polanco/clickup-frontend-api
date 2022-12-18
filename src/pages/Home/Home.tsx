import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  retrieveAuthorizationCode,
  getClickUpAuthorizedTeams,
  getSpaces,
  getFolders,
  getLists,
  getTasks,
} from '../../features/clickup-slice';
import { LoginButton } from '../../components';
import { AppDispatch } from '../../store';

type ClickUpState = {
  clickUp: {
    accessToken: string;
    authorizedTeams: any;
    spaces: any;
    folders: any;
    lists: any;
    tasks: any;
  };
};

const Home = () => {
  const [searchParams] = useSearchParams();
  const userCode: string = searchParams.get('code') ?? '';
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken, authorizedTeams, spaces, folders, lists, tasks } =
    useSelector((state: ClickUpState) => state?.clickUp);

  useEffect(() => {
    if (!accessToken && userCode) {
      dispatch(retrieveAuthorizationCode(userCode));
    }
    if (authorizedTeams.length === 0 && accessToken) {
      dispatch(getClickUpAuthorizedTeams());
    }
    if (spaces.length === 0 && accessToken) {
      dispatch(getSpaces());
    }
    if (folders.length === 0 && spaces) {
      dispatch(getFolders());
    }
    if (lists.length === 0 && folders) {
      dispatch(getLists());
    }
    if (tasks.length === 0 && lists) {
      dispatch(getTasks());
    }
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
      <h2>folders:</h2>
      <ul>
        {folders &&
          spaces &&
          folders[0].folders.map(
            ({ id, name }: { id: string; name: string }) => {
              {
                return (
                  <li key={id}>
                    folder id: {id}
                    <br />
                    folder name: {name}
                    <hr />
                  </li>
                );
              }
            }
          )}
      </ul>
      <h2>lists:</h2>
      <ul>
        {lists &&
          folders &&
          lists[0].lists.map(({ id, name }: { id: string; name: string }) => {
            {
              return (
                <li key={id}>
                  list id: {id}
                  <br />
                  list name: {name}
                  <hr />
                </li>
              );
            }
          })}
      </ul>
      <h2>tasks:</h2>
      <ul>
        {tasks &&
          lists &&
          tasks[0].tasks.map(({ id, name }: { id: string; name: string }) => {
            {
              return (
                <li key={id}>
                  tasks id: {id}
                  <br />
                  tasks name: {name}
                  <hr />
                </li>
              );
            }
          })}
      </ul>
    </>
  );
};
export default Home;
