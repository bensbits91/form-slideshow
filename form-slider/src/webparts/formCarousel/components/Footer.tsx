import * as React from 'react';
import { ActionButton, IIconProps } from 'office-ui-fabric-react';

import styles from './Slider.module.scss';
import { colors } from './definitions';





export interface FooterProps {
    theme?: any;
}

export interface FooterState {

}

class Footer extends React.Component<FooterProps, FooterState> {
    constructor(props: FooterProps) {
        super(props);
        this.state = {};
    }
    render() {
        const { theme } = this.props;
        const icon_feedback: IIconProps = {
            iconName: 'Feedback',
            color: theme.color_3
        };

        return (
            <div className={styles.footerWrap}>
                <div className='footer-inner'>
                    <ActionButton
                        text='Give us feedback'
                        iconProps={icon_feedback}
                        size={32}
                    />
                </div>
            </div>

        );
    }
}

export default Footer;