interface Login {
  login: {
    authorized: boolean;
  };
}

interface Tree {
  tree: any;
}

interface Grid {
  grid: {
    id: string | number | undefined;
    data: any;
  }
}

interface Content {
  tab: number | string | undefined;
  content: 'grid' | 'document';
}

export type State = Login & Tree & Grid & Content;

export let initialState: State = {
  login: {
    authorized: true,
  },
  tree: undefined,
  grid: {
    id: undefined,
    data: undefined,
  },
  tab: 'grid',
  content: 'grid',
};
