import { Component, h } from 'preact';

interface State {
    list: any[];
    selected?: any;
    error?: string
}

export class Edit extends Component<{}, State> {

    state: State = { list: [] };

    async componentDidMount() {
        await fetch('/query/all')
            .then(res => res.json())
            .then((list: any[]) => this.setState({
                list, selected: (() => {
                    // Stupid hack here
                    if (this.state.selected) {
                        return list.find(item => item.id === this.state.selected.id);
                    } else {
                        return list[0];
                    }
                })(),
            }));
    }

    render() {
        return (
            <div>
                <div style={{ color: 'red' }}>
                    {this.state.error}
                </div>
                {this.renderSelector()}
                {this.renderEditor()}
            </div>
        );
    }

    renderSelector() {
        const options = this.state.list.map(item => {
            const selected = item === this.state.selected;
            return (
                <div key={item.id}
                    style={{ border: selected ? '1px solid red' : '' }}
                    onClick={() => this.setState({ selected: item })}>{item.id}</div>
            );
        });

        return (
            <div>
                {options}
            </div>
        );
    }

    renderEditor() {
        if (!this.state.selected) return;

        return (
            <div>
                <button onClick={this.toggleArchived}>{
                    this.state.selected.isArchived ? 'Unarchive' : 'Archive'
                }</button>

                <div>
                    <label> Description
                        <input value={this.state.selected.description} onChange={(ev: any) => this.setState({
                            selected: {
                                ...this.state.selected,
                                description: ev.currentTarget.value,
                            },
                        })}/>
                    </label>
                    <label> Taglin
                        <input value={this.state.selected.tagline} onChange={(ev: any) => this.setState({
                            selected: {
                                ...this.state.selected,
                                tagline: ev.currentTarget.value,
                            },
                        })}/>
                    </label>
                    <button onClick={this.updateBody}>Update Body</button>
                </div>
            </div>
        );
    }

    private toggleArchived = () => {
        fetch('/command', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                type: 1,
                id: this.state.selected.id,
                payload: !this.state.selected.isArchived,
            }),
        }).then(this.onUpdateResponse);
    }

    private updateBody = () => {
        fetch('/command', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                type: 2,
                id: this.state.selected.id,
                payload: {
                    description: this.state.selected.description,
                    tagline: this.state.selected.tagline,
                },
            }),
        }).then(this.onUpdateResponse);
    }

    private onUpdateResponse = (response: any) => {
        if (response.status === 200) {
            // Yep
            this.componentDidMount();
            this.setState({ error: '' });
        } else {
            this.setState({ error: response.statusText });
        }
    }
}