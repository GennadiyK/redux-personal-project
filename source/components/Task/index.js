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
    inputFieldRef = React.createRef();

    constructor (props) {
        const { editing, completed} = props;
        super(props);
        this.state = {
            value: '',
            toggleEdit: !editing,
            completed: completed,
        }
    }

    componentDidMount () {
        const { message } = this.props;
        this.setState({value: message})
        console.log(this.state)
    }

    _changeValue = (e) => {
        this.setState({value: e.target.value})
    }

    _removeTask = () => {
       const { id, actions: {removeTaskAsync} } = this.props;
        removeTaskAsync(id);
    }

    _editTask = () => {
        const { id, actions: {editingTask }} = this.props;
        const { toggleEdit } = this.state;

        editingTask(id);
        this.setState({toggleEdit: !toggleEdit});
    }


    _submitField = () => {
        const { id, actions: {editTaskAsync} } = this.props;
        const { toggleEdit } = this.state;
        document.addEventListener('keypress', (event) => {
            if(event.keyCode === 13) {
                const message = this.inputFieldRef.current.value;
                editTaskAsync({id, message});
                this.setState({toggleEdit: !toggleEdit});
            }
        });
    }

    _completedTask = () => {
        const { id, actions: {editTaskAsync} } = this.props;
        const { completed } = this.state;

        editTaskAsync({id, completed: !completed, message: this.inputFieldRef.current.value });

        this.setState({completed: !completed})
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.toggleEdit !== prevState.toggleEdit) {
            this.inputFieldRef.current.focus();
        }
    }

    render () {
        const { toggleEdit, completed } = this.state;

        const styles = cx(Styles.task,  {
            [Styles.completed]: completed,
        } );

        return (
            <li className = { styles }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        checked={completed}
                        onClick = { this._completedTask }
                    />
                    <input type = 'text'
                           value = { this.state.value }
                           ref = { this.inputFieldRef }
                           onChange = { this._changeValue }
                           onFocus = { this._submitField }
                           disabled={ toggleEdit }
                    />
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
