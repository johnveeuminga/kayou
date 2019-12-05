import { TREES_INIT, ADD_TREE } from "../../constants/action-types";

const sampleTrees = [
  {
    id: 1,
    userId: 1,
    age: 17,
    specie: 'Benguet Pine',
    dbh: 40,
    mh: 10,
    th: 14,
    volume: 0.81744,
    status: 'Alive',
    category: 'Natural',
    diameter: 2,
    stemQuality: 1,
    location: {
      latitude: 16.403866,
      longitude : 120.608693,
    },
  },
  {
    id: 2,
    userId: 1,
    age: 10,
    specie: 'Benguet Pine',
    dbh: 52,
    mh: 7,
    th: 12,
    volume: 0.96703152,
    status: 'Alive',
    category: 'Natural',
    diameter: 2,
    stemQuality: 1,
    location: {
      latitude: 16.403821,
      longitude: 120.608681,
    },
  },
  {
    id: 3,
    userId: 1,
    age: 17,
    specie: 'Benguet Pine',
    dbh: 52,
    mh: 7,
    th: 12,
    volume: 0.96703152,
    status: 'Dead',
    cause: 'Infestation',
    category: 'Natural',
    diameter: 2,
    stemQuality: 0,
    location: {
      latitude: 16.403809,
      longitude: 120.608647
    },
  },
  {
    id: 4,
    userId: 1,
    age: 22,
    specie: 'Benguet Pine',
    dbh: 33,
    mh: 12,
    th: 15,
    volume: 0.66764412,
    status: 'Alive',
    category: 'Natural',
    stemQuality: 2,
    location: {
      latitude: 16.40379,
      longitude: 120.608741
    },
  },
  {
    id: 5,
    userId: 1,
    age: 30,
    specie: 'Benguet Pine',
    dbh: 48,
    mh: 6,
    th: 15,
    volume: 0.70626816,
    status: 'Alive',
    category: 'Natural',
    stemQuality: 2,
    location: {
      latitude: 16.403731,
      longitude: 120.608648,
    },
  },
  {
    id: 6,
    userId: 1,
    age: 21,
    specie: 'Benguet Pine',
    dbh: 58,
    mh: 7,
    th: 10,
    volume: 1.20306732,
    status: 'Alive',
    category: 'Natural',
    stemQuality: 1,
    location: {
      latitude: 16.403694,
      longitude: 120.608807,
    },
  },
  {
    id: 7,
    userId: 1,
    age: 25,
    specie: 'Benguet Pine',
    dbh: 50,
    mh: 6,
    th: 9,
    volume: 0.76635,
    status: 'Sick',
    actions: 'No actions suggested',
    cause: 'Infestation',
    category: 'Natural',
    stemQuality: 2,
    location: {
      latitude: 16.403632,
      longitude: 120.608788,
    },
  },
  {
    id: 8,
    userId: 1,
    specie: 'Benguet Pine',
    dbh: 28,
    age: 7,
    mh: 9,
    th: 17,
    volume: 0.36049104,
    status: 'Alive',
    category: 'Natural',
    stemQuality: 2,
    location: {
      latitude: 16.403578,
      longitude: 120.608789,
    },
  },
  {
    id: 9,
    userId: 1,
    age: 12,
    specie: 'Benguet Pine',
    dbh: 41,
    mh: 6,
    th: 0,
    volume: 0.51529074,
    status: 'Dead',
    cause: 'Natural calamity',
    category: 'Natural',
    stemQuality: 0,
    location: {
      latitude: 16.40353,
      longitude: 120.608742,
    },
  },
  {
    id: 10,
    userId: 1,
    age: 60,
    specie: 'Benguet Pine',
    dbh: 29,
    mh: 3,
    th: 9,
    volume: 0.12890007,
    status: 'Sick',
    cause: 'Man-made cause',
    actions: 'No actions suggested',
    category: 'Natural',
    stemQuality: 3,
    location: {
      latitude: 16.403573,
      longitude: 120.608744,
    },
  },
];


const INITIAL_STATE = {
  trees: [
    ...sampleTrees,
  ],
  recentlyAddedId: null,
}

const ensureNoDuplicate = (state, trees) => {
  const ids = state.trees.map(tree => tree.id);

  return trees.filter(tree => ids.indexOf(tree.id) === -1)
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TREES_INIT:
      const trees = ensureNoDuplicate(state, action.trees);
      console.log(trees)
      return {
        ...state,
        trees: [
          ...state.trees,
          ...trees
        ],
      };
  
    case ADD_TREE:
      const id = state.trees.length + 1

      const tree = {
        id,
        ...action.tree
      }

      return {
        ...state,
        trees: [
          ...state.trees,
          tree,
        ],
        recentlyAddedId: id,
      }

    default:
      return state;
  }
}