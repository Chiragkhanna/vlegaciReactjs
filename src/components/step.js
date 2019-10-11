import React from "react"
import stepData from './stepdata.json';

import Section from "./section";

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

    }
    createRenderData = () => {
        const stepGroupData = groupBy(stepData.Data, 'Type');
        let renderStep = [];
        for (var prop in stepGroupData) {
            if (Object.prototype.hasOwnProperty.call(stepGroupData, prop)) {
                // do stuff
                renderStep.push(<div>  <Section sectionTitle={prop} sectionData={stepGroupData[prop]} /> <br /></div>);
            }
        }
        return renderStep;
    }
    render() {
        //console.log(groupBy(stepData.Data, 'Type'));
        return (
            <div class="col">
                {this.createRenderData()}
            </div>
        )
    }
}

export default Step