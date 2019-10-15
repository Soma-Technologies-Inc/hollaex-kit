import React, { Component } from 'react';
import classnames from 'classnames';
import { FieldContent } from './FieldWrapper';

import STRINGS from '../../../config/localizedStrings';
import { FLEX_CENTER_CLASSES } from '../../../config/constants';

class ToggleField extends Component {
    state = {
        selected: this.props.options[0] && this.props.options[0].value ? this.props.options[0].value : ''
    }

    componentDidMount() {
        const { input } = this.props;
        if (input && (input.value || input.value === false)) {
            this.setState({ selected: input.value });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.input.value !== nextProps.input.value
            && (nextProps.input.value || nextProps.input.value === false)) {
            this.setState({ selected: nextProps.input.value });
        }
    }

    onToogle = () => {
        const { options, input } = this.props;
        const selected =
            this.state.selected === options[0].value ? options[1].value : options[0].value;
        input.onChange(selected);
        this.setState({ selected });
    };

    render() {
        const {
            options,
            label,
            className,
            meta = { active: false, error: '', touched: false, invalid: false },
            toggleOnly,
            ...rest
        } = this.props;
        const { selected } = this.state;
        return (
            <div className={classnames("py-2", className)}>
                {toggleOnly 
                    ? <Toggle selected={selected} options={options} onToogle={this.onToogle}  />
                    : <FieldContent
                        hideUnderline={true}
                        meta={meta}
                        valid={!meta.invalid}
                        {...rest}>
                        <div className="d-flex justify-content-between">
                            <div>
                                {label}
                            </div>
                            <Toggle selected={selected} options={options} onToogle={this.onToogle}  />
                        </div>
                    </FieldContent>
                }
            </div>
        );
    }
}

const Toggle = ({ options, selected, onToogle }) => (
    <div className={classnames('toggle_button-wrapper', 'd-flex')}>
        <div
            className={classnames(
                'toggle-content',
                'f-0',
                ...FLEX_CENTER_CLASSES,
                'direction_ltr'
            )}
        >

            <div className={classnames({ selected: options[1].value === selected })}>
                {options[1].label}
            </div>
            <div
                onClick={onToogle}
                className={classnames('toggle-action_button', {
                    left: options[1].value === selected,
                    right: options[0].value === selected
                })}
            >
                <div className="toggle-action_button-display" />
            </div>
            <div className={classnames({ selected: options[0].value === selected })}>
                {options[0].label}
            </div>
        </div>
    </div>
);

ToggleField.defaultProps = {
    options: STRINGS.DEFAULT_TOGGLE_OPTIONS,
    onChange: () => {},
    toggleOnly: false
};
export default ToggleField;