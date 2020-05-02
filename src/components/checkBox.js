import React from 'react';
import styled from 'styled-components'

const checkBoxMarks = {
    on: checkOn,
    off: checkOff
};

const CheckBox = styled.input`
    position: absolute;
    z-index: -1;
    opacity: 0;
`;

const CheckBoxContayner = styled.div`
    display: flex;
    margin-bottom: 38px;
`;

const Label = styled.label`
    width: 1em;
    height: 1em;
    border-radius: 0.25em;
    margin-right: 0.5em;
`;

const Span = styled.span`
    display: flex;
    font-size: 15px;
    line-height: 23px;
    color: #666461;
    font-family: Arial;
    margin-left: 24px;
    margin-top: -1px;
    width: 199px;
`;

class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkBoxInit: false,
            checkBoxStyle: checkBoxMarks.off
        };
    }

    changeOfMark() {
        if (this.state.checkBoxInit === false) {
            this.setState({
                checkBoxStyle: checkBoxMarks.on,
                checkBoxInit: true
            })
        } else {
            this.setState({
                checkBoxStyle: checkBoxMarks.off,
                checkBoxInit: false
            })
        }
    }

    render() {
        return (
            <>
                <CheckBoxContayner>
                    <CheckBox type='checkbox' id='myCheckBox' />
                    <Label onClick={this.changeOfMark.bind(this)}
                        for='myCheckBox'
                        style={{ backgroundImage: `url(${this.state.checkBoxStyle})` }}>
                        <Span>Ответственный сотрудник</Span>
                    </Label>
                </CheckBoxContayner>
            </>
        )
    }
}

export default CheckBox