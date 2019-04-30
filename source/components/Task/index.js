// Core
import React, { PureComponent } from 'react';
import cx from 'classnames';

import { connect } from 'react-redux';
import bindActionCreators from "redux/src/bindActionCreators";
import { tasksActions } from '../../bus/tasks/actions';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Remove from '../../theme/assets/Remove';
import Edit from '../../theme/assets/Edit';
import Star from '../../theme/assets/Star';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                ...tasksActions,
            },
            dispatch),
    };
};

@connect(
    null,
    mapDispatchToProps,
)

export default class Task extends PureComponent {
    inputFieldRef = React.createRef()

    constructor (props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    componentDidMount () {
        const { message } = this.props;
        this.setState({value: message})
    }

    _changeValue = (e) => {
        this.setState({value: e.target.value})
    }

    _removeTask = () => {
       const { id, actions: {removeTaskAsync} } = this.props;
        removeTaskAsync(id, message);
    }

    _editTask = () => {
        const { id, actions: {editTaskAsync} } = this.props;
        this.inputFieldRef.current.disabled = false;
        this.inputFieldRef.current.focus()

        document.addEventListener('keypress', (event) => {
            if(event.keyCode === 13) {
                const message = this.inputFieldRef.current.value;
                this.inputFieldRef.current.disabled = true;
                editTaskAsync({id, message})

            }
        });
    }

    render () {
        const { completed } = this.props;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { styles }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                    />
                    <input disabled type = 'text' value = { this.state.value } ref = { this.inputFieldRef } onChange={this._changeValue}/>
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked
                        inlineBlock
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                    />
                    <Edit
                        inlineBlock
                        checked = { false }
                        className = { Styles.updateTaskMessageOnClick }
                        onClick={this._editTask}
                        color1 = '#3B8EF3'
                        color2 = '#000'
                    />
                    <Remove
                        inlineBlock
                        onClick={this._removeTask}
                        className = { Styles.removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                    />
                </div>
            </li>
        );
    }
}
