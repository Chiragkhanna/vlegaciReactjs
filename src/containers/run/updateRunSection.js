import { itemsIsLoading, itemsHasErrored } from '../../actions/items';
import { runSectionFetchDataSuccess } from './action';

export function updateRunSection(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url).then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                res = res.Data;

                dispatch(runSectionFetchDataSuccess(res));
                return res;
            })
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}
