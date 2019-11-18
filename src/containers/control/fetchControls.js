import { itemsIsLoading, itemsHasErrored } from '../../actions/items';
import { controlsFetchDataSuccess, updateRunId } from '../../actions/control';

export function fetchControls(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url).then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                res = res.control;
                // do grouping of data 
                let controlGroupData = [...res.reduce((r, o) => {
                    const key = o.Run + '-' + o.User;

                    const item = r.get(key) || Object.assign({}, o, {
                        types: []
                    });

                    item.types.push(o);

                    return r.set(key, item);
                }, new Map()).values()
                ];
                for (var prop in controlGroupData) {
                    if (Object.prototype.hasOwnProperty.call(controlGroupData, prop)) {
                        controlGroupData[prop]["types"].shift();
                        //controlGroupData[prop]["types"] = controlGroupData[prop]["types"]
                    }
                }
                dispatch(controlsFetchDataSuccess(controlGroupData));
                return controlGroupData;
            })
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function updateSelectedRun(runId) {
    return (dispatch) => { dispatch(updateRunId(runId)) };
}