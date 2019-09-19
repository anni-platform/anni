import React, { Component } from 'react';
import classNames from 'classnames';

import Editor from 'draft-js-plugins-editor';
import {
  EditorState,
  RichUtils,
  getVisibleSelectionRect,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import createCounterPlugin from 'draft-js-counter-plugin';

const counterPlugin = createCounterPlugin();
const { CharCounter, WordCounter, CustomCounter } = counterPlugin;
const plugins = [counterPlugin];

class StyleButton extends Component {
  onToggle = e => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  };

  render() {
    const toolbarItem = classNames({
      toolbarItem: true,
      active: this.props.active,
    });

    return (
      <button className={toolbarItem} onClick={this.onToggle}>
        {this.props.label}
      </button>
    );
  }
}

const styleTypes = [
  { initial: 'B', label: 'Bold', style: 'BOLD' },
  { initial: 'I', label: 'Italic', style: 'ITALIC' },
  { initial: 'U', label: 'Underline', style: 'UNDERLINE' },
  { initial: 'S', label: 'Strikethrough', style: 'STRIKETHROUGH' },
];

const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  const { condensed } = props;

  return (
    <div>
      <h3>Text styles</h3>
      <ul>
        {styleTypes.map(type => (
          <li key={type.label}>
            <StyleButton
              active={currentStyle.has(type.style)}
              label={condensed ? type.initial : type.label}
              onToggle={props.onToggle}
              style={type.style}
              noBorder
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const tempStyles = {
  padding: 16,
  border: '2px solid limegreen',
};

export default class TextEditor extends Component {
  static defaultProps = {
    save: () => null,
  };

  constructor(props) {
    super(props);

    const { textEditorContent } = this.props;
    this.state = {
      editorState: textEditorContent
        ? EditorState.createWithContent(convertFromRaw(textEditorContent))
        : EditorState.createEmpty(),
    };
  }

  focus = () => this.refs.editor.focus();

  onChange = editorState => {
    this.setState({ editorState });
  };

  save = () => {
    // export data to a raw format and save to database
    const contentState = this.state.editorState.getCurrentContent();
    const editorContentRaw = convertToRaw(contentState);
    this.props.save({ textEditorContent: editorContentRaw });
  };

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  displayContextualMenu = () => {
    const selectedText = getVisibleSelectionRect(window);
    const toolbar = this.toolbar.getBoundingClientRect();
    const toolbarParent = this.toolbarParent.getBoundingClientRect();

    if (selectedText !== null && selectedText.width > 1) {
      this.setState({
        styles: {
          opacity: 1,
          left:
            selectedText.left -
            toolbarParent.left -
            toolbar['width'] / 2 +
            selectedText.width / 2,
          top: selectedText.top - toolbarParent.top - toolbar['height'] * 1.25,
          visibility: 'visible',
        },
      });
    } else {
      this.hideContextualMenu();
    }
  };

  hideContextualMenu = () => {
    this.setState({ styles: { opacity: 0, visibility: 'hidden' } });
  };

  averageReadingTime(str) {
    const wordArray = str.match(/\S+/g); // matches words according to whitespace
    return wordArray
      ? new Date((wordArray.length / 3) * 1000)
          .toUTCString()
          .match(/(\d\d:\d\d:\d\d)/)[0]
      : '00:00:00';
  }

  render() {
    const { editorState } = this.state;

    // disabling toolbar for now
    // const toolbar = (
    //   <div style={styles} ref={ref => (this.toolbar = ref)}>
    //       <InlineStyleControls
    //         condensed
    //         editorState={editorState}
    //         onToggle={this.toggleInlineStyle}
    //       />
    //     </div>
    // );

    return (
      <div ref={ref => (this.toolbarParent = ref)} style={tempStyles}>
        <div
          // disabled - onMouseUp={this.displayContextualMenu}
          onClick={this.focus}
        >
          <div>
            <Editor
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onClick={this.focus}
              placeholder="Start writing here..."
              plugins={plugins}
              ref="editor"
              spellCheck={true}
            />
            <button
              onClick={this.save}
              style={{
                padding: 4,
                background: 'limegreen',
              }}
            >
              Save
            </button>
          </div>
        </div>
        <div>
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <ul>
            <li>
              <CharCounter /> characters
            </li>
            <li>
              <WordCounter /> words
            </li>
            <li>
              Reading time{' '}
              <CustomCounter countFunction={this.averageReadingTime} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
