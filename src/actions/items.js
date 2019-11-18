export const ITEMS_IS_LOADING = 'ITEMS_IS_LOADING';
export const ITEMS_FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS';
export const ITEMS_HAS_ERRORED = 'ITEMS_HAS_ERRORED';

export function itemsHasErrored(bool) {
    return {
        type: ITEMS_HAS_ERRORED,
        error: bool
    };
}
export function itemsIsLoading(bool) {
    return {
        type: ITEMS_IS_LOADING,
        pending: bool
    };
}
export function itemsFetchDataSuccess(items) {

    return {
        type: ITEMS_FETCH_DATA_SUCCESS,
        items
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}
