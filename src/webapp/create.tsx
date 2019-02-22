import { h, Component } from 'preact';

interface State {
    id: string;
    price: string;
    sweeps: string;
    goldCoins: string;
    isSpecialOffer: boolean;
    isOneTimeOffer: boolean;
    description: string;
    tagline: string;
    startTime: string;
    expiryTime: string;

    responseMessage: string;
}

export class Create extends Component<{}, State> {

    state: State = {
        responseMessage: '',
        id: 'A UNIQUE ID',
        price: '10.00',
        sweeps: '23.55',
        goldCoins: '1000',
        isSpecialOffer: false,
        isOneTimeOffer: false,
        description: 'A $10 bundle!',
        tagline: '1000 Gold Coins!',
        startTime: '2019/03/03',
        expiryTime: '2019/04/04',
    };

    setString = stringStateSetters(
        [
            'id',
            'price',
            'sweeps',
            'goldCoins',
            'description',
            'tagline',
            'startTime',
            'expiryTime',
        ],
        this,
    );

    setBool = booleanStateSetters(
        [
            'isSpecialOffer',
            'isOneTimeOffer',
        ],
        this,
    );

    render() {
        return (
            <div>
                <div>
                    <label>
                        ID:
                        <input value={this.state.id} onChange={this.setString.id}/>
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input value={this.state.price} onChange={this.setString.price}/>
                    </label>
                </div>
                <div>
                    <label>
                        Sweeps:
                        <input value={this.state.sweeps} onChange={this.setString.sweeps}/>
                    </label>
                </div>
                <div>
                    <label>
                        Gold Coins:
                        <input value={this.state.goldCoins} onChange={this.setString.goldCoins}/>
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <input value={this.state.description} onChange={this.setString.description}/>
                    </label>
                </div>
                <div>
                    <label>
                        Tag line:
                        <input value={this.state.tagline} onChange={this.setString.tagline}/>
                    </label>
                </div>
                <div>
                    <label>
                        Start Time:
                        <input value={this.state.startTime} onChange={this.setString.startTime}/>
                    </label>
                </div>
                <div>
                    <label>
                        Expiry Time:
                        <input value={this.state.expiryTime} onChange={this.setString.expiryTime}/>
                    </label>
                </div>
                <div>
                    <label>
                        Special Offer:
                        <input type='checkbox' checked={this.state.isSpecialOffer || false}
                            onChange={this.setBool.isSpecialOffer}/>
                    </label>
                </div>
                <div>
                    <label>
                        One-Time Offer:
                        <input type='checkbox' checked={this.state.isOneTimeOffer || false}
                            onChange={this.setBool.isOneTimeOffer}/>
                    </label>
                </div>

                <button onClick={this.post}>Submit</button>

                <div style={{ color: 'red' }}>
                    {this.state.responseMessage}
                </div>
            </div>
        );
    }

    post = () => {
        const { id, responseMessage, ...payload } = this.state;
        fetch('/command', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                type: 0,
                id,
                payload,
            }),
        }).then(res => res.text()).then(res => {
            this.setState({ responseMessage: res });
        });
    }
}

function stringStateSetters(setters: string[], stateOwner: Component): Lookup<(evt: any) => void> {
    const lookup: Lookup<(evt: any) => void> = {};

    for (const toSet of setters) {
        lookup[toSet] = (evt: any) => stateOwner.setState({ [toSet]: evt.currentTarget.value });
    }

    return lookup;
}

function booleanStateSetters(setters: string[], stateOwner: Component): Lookup<(evt: any) => void> {
    const lookup: Lookup<(evt: any) => void> = {};

    for (const toSet of setters) {
        lookup[toSet] = (evt: any) => stateOwner.setState({ [toSet]: evt.currentTarget.checked });
    }

    return lookup;
}