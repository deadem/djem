interface Login {
  login: {
    authorized: boolean;
  };
}

interface Tree {
  tree: {
    refs: {};
    data: any[];
  }
}

interface Grid {
  grid: {
    id: string | number | undefined;
    data: any;
  }
}

interface Content {
  tab: number | string | undefined;
  content: {
    active?: string | number;
    data: {};
  }
}

export type State = Login & Tree & Grid & Content;

export let initialState: State = {
  login: {
    authorized: true,
  },
  tree: {
    refs: {},
    data: [],
  },
  grid: {
    id: undefined,
    data: undefined,
  },
  tab: 'grid',
  content: { data: {} },
};
