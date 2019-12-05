import { TREES_INIT } from '../../constants/action-types';

import { call, takeEvery, all, put } from 'redux-saga/effects'

const sampleTrees = [
  {
    id: 1,
    userId: 1,
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
    specie: 'Benguet Pine',
    dbh: 52,
    mh: 7,
    th: 12,
    volume: 0.96703152,
    status: 'Dead',
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
    specie: 'Benguet Pine',
    dbh: 50,
    mh: 6,
    th: 9,
    volume: 0.76635,
    status: 'Alive',
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
    specie: 'Benguet Pine',
    dbh: 41,
    mh: 6,
    th: 0,
    volume: 0.51529074,
    status: 'Dead',
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
    specie: 'Benguet Pine',
    dbh: 29,
    mh: 3,
    th: 9,
    volume: 0.12890007,
    status: 'Alive',
    category: 'Natural',
    stemQuality: 3,
    location: {
      latitude: 16.403573,
      longitude: 120.608744,
    },
  },
];

export function* asyncSampleWorker ({ trees }) {
  try {
    console.log('Something')
    yield put({ type: TREES_INIT, trees: sampleTrees })
  } catch (err) {
    console.log(err);
  }

  return {
    message: 'This is something',
  }
}

function* watchSampleWorkerAsync() {
  yield takeEvery('SAMPLE_WORKER', asyncSampleWorker)
}

export default function* rootSaga () {
  yield all([
    watchSampleWorkerAsync(),
  ]);
}