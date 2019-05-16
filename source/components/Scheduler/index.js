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
        isAllCompleted: state.tasks.list.size > 0 ? state.tasks.list.every((task) => task.get("completed") === true) : false
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
    constructor(props) {
        super(props);

        this.state = {
            isAllCompletedState: props.isAllCompleted,
            searchValue: '',
        }
    }
    _createTask = (e) => {
        e.preventDefault();

        if(!!this.createTaskInput.current.value) {
            this.props.actions.createTaskAsync(this.createTaskInput.current.value);
        }

    };

    _handleCompletedAll = () => {
        const { actions: { completedAllTasksAsync } } = this.props;
        const { isAllCompletedState } = this.state;

        completedAllTasksAsync(!isAllCompletedState);

        this.setState({
            isAllCompletedState: !isAllCompletedState
        })
    }

    _handleFilteringTask = (e) => {
        this.setState({searchValue: e.target.value});
    }

    componentDidMount () {
        const { actions: {fetchTasks} } = this.props;
        fetchTasks();
    }

    componentWillUpdate(nextProps, nextState){
        if(nextProps.isAllCompleted !== nextState.isAllCompletedState) {
            this.setState({
                isAllCompletedState: nextProps.isAllCompleted
            })
        }
    }

    render () {
        const { tasks: {list}, editingId } = this.props;
        const { isAllCompletedState, searchValue } = this.state;

        const tasksFilteredList = list.filter((item) => item.get('message').includes(searchValue));

        const todoList = tasksFilteredList.map((task) => {

            return (<Task
                completed={task.get('completed')}
                favorite={task.get('favorite')}
                id={task.get('id')}
                key={`${task.get('id')}${task.get('completed')}`}
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
                        <input placeholder = 'Поиск' type = 'search' onChange={this._handleFilteringTask}/>
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
                        <Checkbox checked = { isAllCompletedState } onClick={ this._handleCompletedAll } color1 = '#363636' color2 = '#fff' />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
