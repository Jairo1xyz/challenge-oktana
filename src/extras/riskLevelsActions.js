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
            console.log("Bien 1");
            /*const res = await fetch('http://jsonplaceholder.typicode.com/posts', {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
              });*/
            const res = await fetch('./data.json', {
              headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
            });
            console.log("Bien 2", res);
            const resJSON =  await res.json();
            console.log("Bien 3");
            dispatch(fetchLevelsSuccess(resJSON));
            console.log("Bien 4");
            return resJSON;
        } catch (error){
            dispatch(fetchLevelsFailure("Error: "+error));
        }
    }
}