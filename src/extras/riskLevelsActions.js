export const FETCH_LEVELS_SUCCESS = 'FETCH_LEVELS_SUCCESS';
export const FETCH_LEVELS_FAILURE = 'FETCH_LEVELS_FAILURE';

export const fetchLevelsSuccess = levels => ({
  type: FETCH_LEVELS_SUCCESS,
  result: levels
});

export const fetchLevelsFailure = error => ({
  type: FETCH_LEVELS_FAILURE,
  result: error
});

export function fetchRiskLevels(){
    return async dispatch => {
        try{
          // This code is for testing Error Display message
          //throw new Error('Whoops!');

          const res = await fetch('/data.json', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
          });
          const resJSON =  await res.json();
          dispatch(fetchLevelsSuccess(resJSON));
          
          return resJSON;
        } catch (e){
            dispatch(fetchLevelsFailure(e.name + ': ' + e.message));
        }
    }
}