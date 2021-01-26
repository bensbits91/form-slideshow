import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
// import { colors } from './definitions';
import styles from './Slider.module.scss';



export interface ButtonsProps {
    theme?: any;
}

export interface ButtonsState {

}

class Buttons extends React.Component<ButtonsProps, ButtonsState> {
    constructor(props: ButtonsProps) {
        super(props);
        this.state = {};
    }
    render() {
        const { theme } = this.props;
        return (
            <div className={styles.buttonWrap}>
                <PrimaryButton
                    text='Save Draft'
                    onClick={() => console.log('Save Draft')}
                    // styles={{ root: { backgroundColor: theme.color_2 } }}
                    className={styles.buttonCustom + ' buttonCustom'}
                />
                <PrimaryButton
                    text='Request Review'
                    onClick={() => console.log('Request Review')}
                    className={styles.buttonCustom + ' buttonCustom'}
                />
                <PrimaryButton
                    text='Publish Now'
                    onClick={() => console.log('Publish Now')}
                    className={styles.buttonCustom + ' buttonCustom'}
                    disabled
                />
                <PrimaryButton
                    text='Start Over'
                    onClick={() => console.log('Start Over')}
                    className={styles.buttonCustom + ' buttonCustom'}
                />
                <PrimaryButton
                    text='Cancel & Go Home'
                    onClick={() => console.log('Cancel & Go Home')}
                    className={styles.buttonCustom + ' buttonCustom'}
                />
            </div>
            
        );
    }
}

export default Buttons;