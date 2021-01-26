import * as React from 'react';
import AwesomeSlider from 'react-awesome-slider';
// import AwesomeSliderStyles from 'react-awesome-slider/src/styled/cube-animation';
import { Web } from "@pnp/sp/presets/all";


import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import 'react-awesome-slider/dist/custom-animations/fall-animation.css';
import 'react-awesome-slider/dist/custom-animations/fold-out-animation.css';
import 'react-awesome-slider/dist/custom-animations/scale-out-animation.css';
import 'react-awesome-slider/dist/custom-animations/open-animation.css';

// import FieldDropDown from './FieldDropDown';
import FieldText from './FieldText';
import FieldDatePicker from './FieldDatePicker';
import FieldChoiceButtons from './FieldChoiceButtons';
import Buttons from './Buttons';
import Footer from './Footer';

import { colors, init_fields, slide_rules } from './definitions';

import styles from './Slider.module.scss';

const mcc = 'color:yellow;';
const mcc2 = 'color:yellow;background-color:black;';


const lastSlide = slide_rules.filter(s => s.isLastSlide)[0].field;
console.log('%c : Slider -> render -> lastSlide', mcc2, lastSlide);



export interface SliderProps {
    web: string;
    list: string;
    isAdmin: boolean;
    theme?: any;
}

export interface SliderState {
    compact: boolean;
    dark: boolean;
    fields: any;
    completed_fields: any;
    slides_visible: any;
}

class Slider extends React.Component<SliderProps, SliderState> {
    constructor(props: SliderProps) {
        super(props);
        this.state = {
            // sections: null,
            dark: false,
            compact: false,
            fields: null,
            completed_fields: null,
            slides_visible: init_fields
        };
    }

    public componentDidMount() {
        console.clear();
        this.getData_fields().then((fields: any) => {
            // console.log('%c : Form -> componentDidMount -> fields', mcc, fields);
            this.setState({
                fields: fields
            });
        });
    }

    public componentDidUpdate(prevProps: SliderProps, prevState: SliderState) {
        console.log('%c : Slider -> componentDidUpdate -> this.state', mcc, this.state);
    }

    public getData_fields = () => new Promise(resolve => {
        const the_web = Web(this.props.web);
        the_web.lists.getByTitle('CI Requests').fields
            .filter("Hidden eq false and ReadOnlyField eq false and InternalName ne 'ContentType'")
            .select('TypeAsString', 'InternalName', 'Title', 'Required', 'SchemaXml', 'FieldTypeKind', 'Choices', 'Description')
            .get().then(fields => {
                resolve(fields);
            });
    })

    public handler_fields(slide, field, value) {
        // console.log('%c : Slider -> handler_fields -> slide', mcc, slide);
        // console.log('%c : Slider -> handler_fields -> field', mcc, field);
        // console.log('%c : Slider -> handler_fields -> value', mcc, value);
        // console.log('%c : Slider -> handler_fields -> event.target', mcc, event.target);
        // console.log('%c : Slider -> handler_fields -> event.target.dataset', mcc, event.target.dataset);

        const field_obj = {
            InternalName: field.InternalName,
            value: value
        };

        const { completed_fields } = this.state;
        let new_cf = JSON.parse(JSON.stringify(completed_fields));

        const field_already = new_cf ? new_cf.filter(n => n.InternalName == field.InternalName)[0] : null;

        if (value) {
            changeDot(slide, this.props.theme.color_3);

            this.getSlidesToAdd(field.InternalName).then((slides_visible_new: any) => {

                if (field_already && field_already.value != value) field_already.value = value;
                else if (new_cf) new_cf.push(field_obj);
                else new_cf = [field_obj];


                this.setState({
                    slides_visible: slides_visible_new,
                    completed_fields: new_cf
                });
            });
        }
        else {
            if (field.Required)
                changeDot(slide, colors.red);
            else
                changeDot(slide, this.props.theme.color_2);
                // changeDot(slide, '#6a6a6a');

            if (field_already) {
                const new_cf_2 = new_cf.filter(n => n.InternalName != field_already.InternalName);
                this.setState({
                    completed_fields: new_cf_2
                });
            }


        }
    }

    public getSlidesToAdd = (field_name) => new Promise(resolve => {

        const matching_rule = slide_rules.filter(r => r.field == field_name)[0];

        const matching_depends = matching_rule && matching_rule.depends && matching_rule.depends.length
            ? matching_rule.depends[0].show // only using the first match for now
            : null;

        const matching_show = matching_rule && matching_rule.show
            ? matching_rule.show
            : null;

        const array_of_shows =
            matching_depends && matching_depends.length ? matching_depends
                : matching_show && matching_show.length ? matching_show
                    : null;

        const slides_visible_new = JSON.parse(JSON.stringify(this.state.slides_visible));
        if (array_of_shows) {
            array_of_shows.map(s => {
                if (slides_visible_new.indexOf(s) === -1) {
                    slides_visible_new.push(s);
                }
            });
        }

        resolve(slides_visible_new);
    })


    public render() {

        const { dark, compact, fields, slides_visible, completed_fields } = this.state;
        const { theme } = this.props;


        const style_slides = {
            backgroundColor: theme.color_1,
            color: theme.color_2,
            border: '1px solid #ccc'
        };

        let slides = [];

        if (fields) {
            fields.map(f => {
                const slide_index = slides_visible.indexOf(f.InternalName);
                const show = slide_index > - 1;
                if (show) {

                    // const cf_copy = JSON.parse(JSON.stringify(completed_fields));

                    // const value_current = cf_copy ? JSON.parse(JSON.stringify(cf_copy)).filter(c => c.InternalName = f.InternalName)[0].value
                    //     : null;
                    // console.log('%c : Slider -> render -> value_current', mcc2, value_current);

                    const field =
                        f.TypeAsString == 'Choice' ?
                            <FieldChoiceButtons
                                field={f}
                                handler={(slide, field, value) => this.handler_fields(slide, field, value)}
                                dark={dark}
                                theme={theme}
                                slideId={slide_index}
                            />
                            : f.TypeAsString == 'Text' || f.TypeAsString == 'Note' ?
                                <FieldText
                                    field={f}
                                    handler={(slide, field, value) => this.handler_fields(slide, field, value)}
                                    multiline={f.TypeAsString == 'Note'}
                                    rows={6}
                                    dark={dark}
                                    theme={theme}
                                    slideId={slide_index}
                                // value={value_current}
                                />
                                : <></>;

                    const isLastSlide = f.InternalName == lastSlide;
                    const lastSlide_bottom = isLastSlide ?
                        <div>
                            <Buttons theme={theme} />
                            <Footer theme={theme} />
                        </div>
                        : <></>;

                    slides.push(
                        <div
                            key={f.InternalName}
                            data-slideid={slide_index}
                            // className={styles.slideContentWrap}
                            style={style_slides}
                        >
                            <div
                                className={styles.slideTop}
                            >
                                <div
                                    className={styles.slideTitle}
                                >
                                    {isLastSlide ? 'Almost done' : f.Title}
                                </div>
                                <div
                                    className={styles.slideDescription}
                                >
                                    {isLastSlide ? 'Comments optional. Click a button when you\'re ready.' : f.Description}
                                </div>
                                {field}
                            </div>
                            {lastSlide_bottom}
                        </div>
                    );
                }
            });
        }



        return (
            <AwesomeSlider
                animation='cubeAnimation'
                // animation='openAnimation'
                // animation='scaleOutAnimation'
                // animation='fallAnimation'
                // animation='foldOutAnimation'
                className='awesome-slider'
                // fillParent
                infinite={false}
            >
                {fields && slides.length && slides}
            </AwesomeSlider>
        );
    }
}

function changeDot(num, color) {
    const theDot: HTMLElement = document.querySelector('.awssld__bullets button[data-index="' + num + '"]');
    if (theDot) theDot.style['background-color'] = color;
}

export default Slider;