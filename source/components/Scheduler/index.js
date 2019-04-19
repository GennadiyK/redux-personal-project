// Core
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';

// Instruments
import Styles from './styles.m.css';
import { tasks } from './tasks';
import { tasksActions } from '../../bus/tasks/actions'

// Components
import Task from '../Task';
import Checkbox from '../../theme/assets/Checkbox';
import bindActionCreators from "redux/src/bindActionCreators";


const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                createTaskAsync: tasksActions.createTaskAsync,
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
        this.props.actions.createTaskAsync(this.createTaskInput.current.value);
    };

    render () {
        const todoList = tasks.map((task) => (
            <Task
                completed = { task.completed }
                favorite = { task.favorite }
                id = { task.id }
                key = { task.id }
                message = { task.message }
                { ...task }
            />
        ));

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
