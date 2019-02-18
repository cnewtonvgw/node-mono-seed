import { h, Component } from 'preact';

import * as styles from './application.css';

export class Application extends Component {

    render() {
        return (
            <div class={styles.helloWorldText}>Hello, World!</div>
        );
    }
}