interface Login {
  login: {
    authorized: boolean;
  };
}

interface Tree {
  tree?: any;
}

interface Grid {
  grid: {
    id: string | undefined;
    data?: any;
  }
}

export type State = Tree & Login & Grid;

export let initialState: State = {
  login: {
    authorized: true,
  },
  grid: {
    id: undefined,
  },
};
