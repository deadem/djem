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
  tab: string;
  tabs: Array<{ name: string; id: string}>;
  content: {
    [key: string]: {
      params: any;
      data: any;
    };
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
  tabs: [ { name: 'DJEM', id: 'grid' } ],
  content: {},
};
