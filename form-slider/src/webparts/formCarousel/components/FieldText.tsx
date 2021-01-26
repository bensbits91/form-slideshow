import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { colors } from './definitions';
import hexToRgba from 'hex-to-rgba';

const mcc = 'color:teal;';


export interface FieldTextProps {
    field: any;
    handler: any;
    dark: boolean;
    theme: any;
    multiline?: boolean;
    rows?: number;
    slideId: number;
    value?: string;
}

export interface FieldTextState {

}

class FieldText extends React.Component<FieldTextProps, FieldTextState> {
    constructor(props: FieldTextProps) {
        super(props);
        this.state = {};
    }

    public _onChange(field, event) {
        // console.log('%c : FieldText -> _onChange -> field', mcc, field);
        // console.log('%c : FieldText -> _onChange -> event', mcc, event);
        // console.log('%c : FieldText -> _onChange -> event.target.value', mcc, event.target.value);
        this.props.handler(this.props.slideId, field, event.target.value);
    }

    // private _onRenderLabel = (props/* : ITextFieldProps */)/* : JSX.Element */ => {
    //     return (
    //         <span style={{ color: colors.gray.c }}>{props.label}</span>
    //     );
    // }

    public render() {
        const { field, value, theme } = this.props;
        return (
            <div>
                <TextField
                    id={field.InternalName}
                    placeholder='Please enter text here'
                    multiline={this.props.multiline ? this.props.multiline : false}
                    rows={this.props.multiline && this.props.rows ? this.props.rows : 1}
                    onChange={event => this._onChange(field, event)}
                    value={value}
                    styles={{ field: { backgroundColor: hexToRgba(theme.color_1, .5) } }}
                    borderless
                />

            </div>
        );
    }
}

export default FieldText;