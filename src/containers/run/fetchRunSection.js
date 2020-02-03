import { itemsIsLoading, itemsHasErrored } from '../../actions/items';
import { receiveNotesJson } from '../../containers/notes/actions';
import { runSectionFetchDataSuccess } from './action';
import { toggleIsRunChange } from '../../actions/control';
import { NOTES_DATA_API_URL } from '../../config/config'

export function fetchRunSection(url, selectedRunId) {
    return (dispatch) => {
        const success = res => res.ok ? res.json() : Promise.resolve({});

        const runDataCall = fetch(url)
            .then(success);

        const notesDataCall = fetch(NOTES_DATA_API_URL + "/" + selectedRunId)
            .then(success);
        dispatch(itemsIsLoading(true));
        return Promise.all([runDataCall, notesDataCall])
            .then(([runData, notesData]) => {
                let runRes = runData;
                const noteRes = notesData; // you can combine it or use it separately
                if (runRes.error) {
                    throw (runRes.error);
                }
                runRes = runRes.Data.map(obj => {
                    let tempNoteData = noteRes.Data.tracesequences.filter(x => x.trcseq == obj.RLSEQ);
                    return {
                        ...obj,
                        note: tempNoteData.length > 0 ? JSON.stringify(tempNoteData[0].notes) : ''
                    }
                });

                console.log(runRes);
                dispatch(receiveNotesJson(noteRes.Data.tracesequences))
                dispatch(runSectionFetchDataSuccess(runRes));
                dispatch(toggleIsRunChange());
                return runRes;
            })
            .catch(err => console.error(err));
    }
}
    // return (dispatch) => {
    //     dispatch(itemsIsLoading(true));
    //     fetch(url).then(res => res.json())
    //         .then(res => {
    //             if (res.error) {
    //                 throw (res.error);
    //             }
    //             res = res.Data.map(obj => ({ ...obj, note: '' }));
    //             //let data = this.props.data;
    //             //let data = res.map((obj, indx) => ({ ...obj, ColorForCell: '' }));
    //             // const dataKeys = Object.keys(data[0])
    //             // for (let i = 0; i < data.length - 1; i++) {
    //             //     let isUBPresent = false;
    //             //     for (const key of dataKeys) {
    //             //         if (key == "JOENTT" && data[i][key] == "UB")
    //             //             isUBPresent = true;
    //             //         // else if (key == "JOENTT" && data[i][key] == "PT")
    //             //         //         data[i]["ColorForCell"] = data[i]["ColorForCell"] + "," + key;
    //             //         if (isUBPresent && data[i][key] !== data[i + 1][key]) {
    //             //             data[i]["ColorForCell"] = data[i]["ColorForCell"] + "," + key;
    //             //         }

    //             //     }

    //             // }


    //             return res;
    //         }).then(res => {
    //             //add notes value from API
    //             dispatch(runSectionFetchDataSuccess(res));
    //             dispatch(toggleIsRunChange());
    //             return res;
    //         })
    //         .catch(() => dispatch(itemsHasErrored(true)));
    // };



