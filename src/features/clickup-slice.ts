import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFromLocalStorage, setToLocalStorage } from '../utils';
import getAccessToken from '../utils/getClickUpAccessToken';
import axios from 'axios';

axios.defaults.data = {
  accessToken: getFromLocalStorage('accessToken') || null,
};

interface clickUpState {
  accessToken: unknown;
  authorizedTeams: any;
  spaces: any;
  folders: any;
  lists: any;
  tasks: any;
  isLoading: boolean;
}

const initialState: clickUpState = {
  accessToken: getFromLocalStorage('accessToken') || null,
  authorizedTeams: getFromLocalStorage('authorizedTeams') || [],
  spaces: getFromLocalStorage('spaces') || [],
  folders: getFromLocalStorage('folders') || [],
  lists: getFromLocalStorage('lists') || [],
  tasks: getFromLocalStorage('tasks') || [],
  isLoading: false,
};

export const retrieveAuthorizationCode = createAsyncThunk(
  'user/authorization-code',
  async (userCode: string) => {
    const data = await getAccessToken(userCode);

    if (data.access_token) {
      setToLocalStorage({ keyName: 'accessToken', value: data.access_token });
    }

    return data;
  }
);

export const getClickUpAuthorizedTeams = createAsyncThunk(
  'user/authorized-teams',
  async (_, { getState }) => {
    const state: any = getState();

    try {
      const { data } = await axios('/api/v1/click-up/authorized-teams', {
        headers: {
          Authorization: state.clickUp?.accessToken,
        },
      });

      const teamsId = data.teams.map((team: { id: string; name: string }) => {
        const { name, id } = team;

        return { name, id };
      });

      setToLocalStorage({
        keyName: 'authorizedTeams',
        value: teamsId,
      });

      return teamsId;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSpaces = createAsyncThunk(
  'user/spaces',
  async (_, { getState }) => {
    const state: any = getState();

    const { data } = await axios.post(
      '/api/v1/click-up/spaces',
      {
        teamsId: state.clickUp?.authorizedTeams,
      },
      {
        headers: {
          Authorization: state.clickUp?.accessToken,
        },
      }
    );
    setToLocalStorage({ keyName: 'spaces', value: data });
    return data;
  }
);
export const getFolders = createAsyncThunk(
  'user/folders',
  async (_, { getState }) => {
    const state: any = getState();

    const spaces = state.clickUp?.spaces;

    const { data } = await axios.post(
      '/api/v1/click-up/folder',
      {
        spaces,
      },
      {
        headers: {
          Authorization: state.clickUp?.accessToken,
        },
      }
    );
    setToLocalStorage({ keyName: 'folders', value: data });

    return data;
  }
);
export const getLists = createAsyncThunk(
  'user/lists',
  async (_, { getState }) => {
    const state: any = getState();

    const folders = state.clickUp?.folders[0].folders;

    const { data } = await axios.post(
      '/api/v1/click-up/list',
      {
        folders,
      },
      {
        headers: {
          Authorization: state.clickUp?.accessToken,
        },
      }
    );
    setToLocalStorage({ keyName: 'lists', value: data });

    return data;
  }
);
export const getTasks = createAsyncThunk(
  'user/tasks',
  async (_, { getState }) => {
    const state: any = getState();

    const lists = state.clickUp?.lists[0].lists;

    const { data } = await axios.post(
      '/api/v1/click-up/task',
      {
        lists,
      },
      {
        headers: {
          Authorization: state.clickUp?.accessToken,
        },
      }
    );
    setToLocalStorage({ keyName: 'tasks', value: data });

    return data;
  }
);

export const clickUpSlice = createSlice({
  name: 'clickUp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrieveAuthorizationCode.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      retrieveAuthorizationCode.fulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        state.accessToken = payload.access_token;
      }
    );
    builder.addCase(retrieveAuthorizationCode.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getClickUpAuthorizedTeams.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getClickUpAuthorizedTeams.fulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        state.authorizedTeams = payload;
      }
    );
    builder.addCase(getClickUpAuthorizedTeams.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getSpaces.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSpaces.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.spaces = payload;
    });
    builder.addCase(getSpaces.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getFolders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFolders.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.folders = payload;
    });
    builder.addCase(getFolders.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getLists.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLists.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.lists = payload;
    });
    builder.addCase(getLists.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.tasks = payload;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const {} = clickUpSlice.actions;

export default clickUpSlice.reducer;
