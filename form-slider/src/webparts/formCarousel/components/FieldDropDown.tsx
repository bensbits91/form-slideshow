import * as React from 'react';
import { Dropdown, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { colors } from './definitions';

const mcc = 'color:lime;';



export interface FieldDropDownProps {
    field: any;
    handler: any;
    dark: boolean;
    theme: any;
}

export interface FieldDropDownState {

}

class FieldDropDown extends React.Component<FieldDropDownProps, FieldDropDownState> {
    constructor(props: FieldDropDownProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        console.log('%c : FieldDropDown -> componentDidMount -> this.props', mcc, this.props);
    }

    public _onChange(e, o, f) {
        console.log('%c : FieldDropDown -> _onChange -> o', mcc, o);
        console.log('%c : FieldDropDown -> _onChange -> f', mcc, f);

        this.props.handler(f, o);
    }

    public render() {
        const { field, dark, theme } = this.props;

        const options: IDropdownOption[] = [
            {
                key: 'noselection',
                text: 'Please make a selection',
                // disabled: true
            },
            ...field.Choices.map(c => {
                return {
                    key: c.replace(/ /g, ''),
                    text: c
                };
            })];

        const dropdownStyles_dark: Partial<IDropdownStyles> =
            dark ? {
                label: { color: colors.gray.a },
                callout: { border: '0 none' },
                panel: { border: '0 none' },
                title: {
                    backgroundColor: colors.black.b4,
                    border: '0 none',
                    color: colors.black.b9,
                    selectors: {
                        '.ms-Dropdown:focus &': {
                            color: theme.color_1
                        }
                    }
                },
                dropdown: {
                    border: '0 none',
                    selectors: {
                        '&:hover:focus .ms-Dropdown-title': {
                            color: theme.color_1
                        }
                    }
                },
                dropdownItems: {
                    border: '0 none',
                },
                dropdownItemsWrapper: {
                    backgroundColor: colors.black.b4,
                    border: '0 none',
                },
                dropdownOptionText: {
                    color: colors.black.b9,
                    selectors: {
                        'button:hover:focus &': {
                            color: theme.color_1
                        }
                    }
                },
                dropdownItemSelected: {
                    backgroundColor: colors.black.b5,
                    color: colors.gray.a
                },
                dropdownItem: {
                    selectors: {
                        '&:hover:focus':
                        {
                            backgroundColor: 'transparent',
                        }
                    }
                }
                // panel: { backgroundColor: colors.black.b5 },
            }
                : {};


        return (
            <div>
                <Dropdown
                    id={field.InternalName}
                    data-go-to-section={field.go_to_section ? field.go_to_section : ''}
                    placeholder='Please make a selection'
                    // label={field.Title}
                    options={options}
                    onChange={(e, o) => this._onChange(e, o, field)}
                    styles={dropdownStyles_dark}
                />
            </div>
        );
    }
}

export default FieldDropDown;