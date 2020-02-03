import React from "react"
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import Section from "./section";
import { fetchRunSection } from '../containers/run/fetchRunSection';
import { RUN_DATA_API_URL } from '../config/config'

const groupBy = (items, key) => items.reduce(
    (result, item) =>
        Object.assign(result, { [item[key]]: (result[item[key]] || []).concat(item) }),
    {},
);

class Step extends React.Component {
    /**
     * Here, we define a react lifecycle method that gets executed each time 
     * our component is mounted to the DOM, which is exactly what we want in this case
     */
    componentDidMount() {

        //if (!this.props.runSectionList || !(this.props.runSectionList.length > 0)) {
        if (this.props.selectedRunId > 0 && this.props.isRunIdChange) {
            this.props.fetchData(RUN_DATA_API_URL + "/" + this.props.selectedRunId, this.props.selectedRunId);
            //this.props.fetchData(RUN_DATA_API_URL);
        }

        // }
    }

    createRenderData = () => {
        let stepGroupData = {};
        let { runSectionList } = this.props;
        if (runSectionList && runSectionList.length > 0)
            stepGroupData = groupBy(runSectionList, 'Type');
        let renderStep = [];
        for (var prop in stepGroupData) {
            if (Object.prototype.hasOwnProperty.call(stepGroupData, prop)) {
                let newArrayWithoutTypeProp = stepGroupData[prop].map(({ Type, ...keepAttrs }) => keepAttrs)
                renderStep.push(<div key={"sectionDiv_" + prop}>  <Section key={"section_" + prop} currentRunId={this.props.selectedRunId} sectionTitle={prop} sectionData={newArrayWithoutTypeProp} /> <br /></div>);
            }
        }
        return renderStep;
    }
    render() {
        if (this.props.pending && this.props.selectedRunId > 0) {
            return <div className="col">Loading... {this.props.pending}</div>;
        }
        else if (this.props.selectedRunId == null) {
            return <div className="col">Please go back to Program Execution Analysis and Documentation and select Run against which data need to be fetch...</div>;
        }
        return (
            <div className="col">
                {this.createRenderData()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        runSectionList: state.runReducer.runSectionList,
        error: state.error,
        pending: state.pending,
        selectedRunId: state.controlReducer.selectedRunId,
        isRunIdChange: state.controlReducer.isRunIdChange
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchData: fetchRunSection
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Step);
