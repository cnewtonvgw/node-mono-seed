import { h, Component } from 'preact';

interface State {
    list: any[];
}

export class List extends Component<{}, State> {

    state: State = { list: [] };

    async componentDidMount() {
        await fetch('/query/all')
            .then(res => res.json())
            .then(list => this.setState({ list }));
    }

    render() {
        const items = this.state.list.map(item => {
            return (
                <div key={item.id} style={{ border: '1px solid blue' }}>
                    <div>{item.id}</div>
                    <div>{JSON.stringify(item)}</div>
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