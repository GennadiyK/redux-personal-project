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
                removeTaskAsync: tasksActions.removeTaskAsync,
            },
            dispatch),
    };
};

@connect(
    null,
    mapDispatchToProps,
)

export default class Task extends PureComponent {
    _removeTask = () => {
       const { id, actions: {removeTaskAsync} } = this.props;
        removeTaskAsync(id);
    }
    render () {
        const { message, completed } = this.props;

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
                    <input disabled type = 'text' value = { message } />
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
