// Core
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';

// Instruments
import Styles from './styles.m.css';
import { tasksActions } from '../../bus/tasks/actions'

// Components
import Task from '../Task';
import Checkbox from '../../theme/assets/Checkbox';
import bindActionCreators from "redux/src/bindActionCreators";


const mapStateToProps = (state) => {
    return {
        editingId: state.tasks.editingId,
        tasks: state.tasks,
    };
};

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
    mapStateToProps,
    mapDispatchToProps,
)

export default class Scheduler extends Component {
    createTaskInput = createRef();

    _createTask = (e) => {
        e.preventDefault();

        if(!!this.createTaskInput.current.value) {
            this.props.actions.createTaskAsync(this.createTaskInput.current.value);
        }

    };

    componentDidMount () {
        const { actions } = this.props;

        actions.fetchTasks();
    }

    render () {
        const { tasks: {list}, editingId } = this.props;

        const todoList = list.map((task) => {

            return (<Task
                completed={task.get('completed')}
                favorite={task.get('favorite')}
                id={task.get('id')}
                key={task.get('id')}
                editing = {editingId === task.get('id')}
                message={task.get('message')}
                {...task}
            />)
        });

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск' type = 'search' />
                    </header>
                    <section>
                        <form>
                            <input
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                                ref={ this.createTaskInput }
                            />
                            <button onClick={this._createTask} type="submit">Добавить задачу</button>
                        </form>
                        <div className = { Styles.overlay }>
                            <ul>{todoList}</ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox checked color1 = '#363636' color2 = '#fff' />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
