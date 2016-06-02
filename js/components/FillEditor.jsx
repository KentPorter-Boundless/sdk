/*
 * Copyright 2015-present Boundless Spatial Inc., http://boundlessgeo.com
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React from 'react';
import classNames from 'classnames';
import ColorPicker from 'react-color';
import {intlShape, defineMessages, injectIntl} from 'react-intl';
import Label from './Label.jsx';
import pureRender from 'pure-render-decorator';

const messages = defineMessages({
  fillcolorlabel: {
    id: 'filleditor.fillcolorlabel',
    description: 'Label for fill color picker',
    defaultMessage: 'Fill color'
  }
});

/**
 * Style editor for fill color.
 */
@pureRender
class FillEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._setInitialStateFromProp('fillColor', {rgb: {r: 255, g: 0, b: 0, a: 0.5}, hex: 'FF0000'});
    this.props.onChange(this.state);
  }
  _setInitialStateFromProp(prop, defaultVal) {
    if (this.props.initialState && this.props.initialState[prop]) {
      this.state[prop] = this.props.initialState[prop];
    } else {
      this.state[prop] = defaultVal;
    }
  }
  _onChangeFill(color) {
    this.state.fillColor = color;
    this.props.onChange(this.state);
  }
  render() {
    const {formatMessage} = this.props.intl;
    return (
      <div className={classNames('sdk-component stroke-editor', this.props.className)}>
        <Label>{formatMessage(messages.fillcolorlabel)}:</Label>
        <ColorPicker type='chrome' onChangeComplete={this._onChangeFill.bind(this)} color={this.state.fillColor.rgb} />
      </div>
    );
  }
}

FillEditor.propTypes = {
  /**
   * Callback that is called when a change is made.
   */
  onChange: React.PropTypes.func.isRequired,
  /**
   * Css class name to apply on the root element of this component.
   */
  className: React.PropTypes.string,
  /**
   * Initial state.
   */
  initialState: React.PropTypes.object
};

export default FillEditor;
