import { call, debounce, put, spawn, takeLatest, take } from 'redux-saga/effects';
import { searchSkillsRequest, searchSkillsSuccess, searchSkillsFailure } from '../actions/index';
import { CHANGE_SEARCH_FIELD,  SEARCH_SKILLS_REQUEST} from '../actions/actionTypes';
import { searchSkills } from '../api';

function filterChangeSearchAction({type, payload}) {
  return type === CHANGE_SEARCH_FIELD && payload.search.trim() !== ''
}

function* changeSearchSaga() {
  while (true) {
    const action = yield take(CHANGE_SEARCH_FIELD);
    yield put(searchSkillsRequest(action.payload.search));
  }
}

function* watchSearchSkillsSaga() {
  yield takeLatest(SEARCH_SKILLS_REQUEST, handleSearchSkillsSaga);
}

function* watchChangeSearchSaga() {
  yield debounce(100, filterChangeSearchAction, handleChangeSearchSaga);
}

function* handleChangeSearchSaga(action) {
  yield put(searchSkillsRequest(action.payload.search));
}

function* handleSearchSkillsSaga(action) {
  try {
    const data = yield call(searchSkills, action.payload.search);
    yield put(searchSkillsSuccess(data));
  } catch (e) {
    yield put(searchSkillsFailure(e.message));
  }
}

export default function* saga() {
  yield spawn(changeSearchSaga);
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
}