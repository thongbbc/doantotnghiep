import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE,
FETCHING_DATA_SUBJECT, FETCHING_DATA_SUCCESS_SUBJECT, FETCHING_DATA_FAILURE_SUBJECT } from '../constants'
import getAllStudent from '../api/getStudent'
import getAllSubject from '../api/getSubject'
export function getData() {
  return {
    type: FETCHING_DATA
  }
}

export function getDataSuccess(data) {
  return {
    type: FETCHING_DATA_SUCCESS,
    data,
  }
}

export function getDataFailure() {
  return {
    type: FETCHING_DATA_FAILURE
  }
}

export function fetchDataAllStudent() {
    return (dispatch) => {
        dispatch(getData())
        getAllStudent()
          .then((data) => {
            dispatch(getDataSuccess(data))
          })
          .catch((err) => {console.log('err:', err);alert('ERROR')})
      }
}





export function getDataSubject() {
  return {
    type: FETCHING_DATA_SUBJECT
  }
}

export function getDataSuccessSubject(data) {
  return {
    type: FETCHING_DATA_SUCCESS_SUBJECT,
    data,
  }
}

export function getDataFailureSubject() {
  return {
    type: FETCHING_DATA_FAILURE_SUBJECT
  }
}


export function fetchDataAllSubject() {
  return (dispatch) => {
      dispatch(getDataSubject())
      getAllSubject()
        .then((data) => {
          dispatch(getDataSuccessSubject(data))
        })
        .catch((err) => {console.log('err:', err);alert('ERROR')})
    }
}