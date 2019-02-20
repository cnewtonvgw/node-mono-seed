import { h, Component } from 'preact';
import { Create } from './create';

import * as styles from './application.css';
import { List } from './list';
import { Edit } from './edit';
import { Events } from './events';

interface State {
    section: string;
}

export class Application extends Component<{}, State> {

    state: State = { section: 'create' };

    render() {
        return (
            <div>
                <div style={{ border: '2px solid red', marginBottom: '10px' }}>
                    {this.renderSectionChooser()}
                </div>
                {this.renderSection()}
            </div>
        );
    }

    renderSectionChooser() {
        return (
            <div>
                <button onClick={() => this.setState({ section: 'create' })}>CREATE</button>
                <button onClick={() => this.setState({ section: 'list' })}>LIST</button>
                <button onClick={() => this.setState({ section: 'edit' })}>EDIT</button>
                <button onClick={() => this.setState({ section: 'events' })}>EVENTS</button>
            </div>
        );
    }

    renderSection() {
        switch (this.state.section) {
            case 'create':
                return <Create/>;
            case 'list':
                return <List/>;
            case 'edit':
                return <Edit/>;
            case 'events':
                return <Events/>;
        }
    }
}