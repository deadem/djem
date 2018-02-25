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

interface Main {
  content: 'grid' | 'document';
}

export type State = Login & Tree & Grid & Main;

export let initialState: State = {
  login: {
    authorized: true,
  },
  tree: undefined,
  grid: {
    id: undefined,
    data: undefined,
  },
  content: 'grid',
};
