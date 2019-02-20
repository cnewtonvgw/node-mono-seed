import { h, Component } from 'preact';

interface State {
    list: any[];
}

export class Events extends Component<{}, State> {

    state: State = { list: [] };

    async componentDidMount() {
        await fetch('/query/events')
            .then(res => res.json())
            .then(list => this.setState({ list }));
    }

    render() {
        const items = this.state.list.map((item, ii) => {
            return (
                <div key={ii} style={{ border: '1px solid green' }}>
                    {JSON.stringify(item)}
                </div>
            );
        });

        return (
            <div>
                {items}
            </div>
        );
    }
}