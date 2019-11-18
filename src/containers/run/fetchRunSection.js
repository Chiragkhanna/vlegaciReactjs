import { itemsIsLoading, itemsHasErrored } from '../../actions/items';
import { runSectionFetchDataSuccess } from './action';
import { toggleIsRunChange } from '../../actions/control';

export function fetchRunSection(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url).then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                res = res.Data.map(obj => ({ ...obj, note: '' }));
                //let data = this.props.data;
                //let data = res.map((obj, indx) => ({ ...obj, ColorForCell: '' }));
                // const dataKeys = Object.keys(data[0])
                // for (let i = 0; i < data.length - 1; i++) {
                //     let isUBPresent = false;
                //     for (const key of dataKeys) {
                //         if (key == "JOENTT" && data[i][key] == "UB")
                //             isUBPresent = true;
                //         // else if (key == "JOENTT" && data[i][key] == "PT")
                //         //         data[i]["ColorForCell"] = data[i]["ColorForCell"] + "," + key;
                //         if (isUBPresent && data[i][key] !== data[i + 1][key]) {
                //             data[i]["ColorForCell"] = data[i]["ColorForCell"] + "," + key;
                //         }

                //     }

                // }
                dispatch(runSectionFetchDataSuccess(res));
                dispatch(toggleIsRunChange());
                return res;
            })
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}
