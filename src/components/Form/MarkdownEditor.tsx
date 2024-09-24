/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import { useField } from 'formik';
import YooptaEditor, {
  createYooptaEditor,
  YooptaContentValue,
} from '@yoopta/editor';

import Paragraph from '@yoopta/paragraph';
import Blockquote from '@yoopta/blockquote';
import Embed from '@yoopta/embed';
import Image from '@yoopta/image';
import Link from '@yoopta/link';
import Callout from '@yoopta/callout';
import Accordion from '@yoopta/accordion';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from '@yoopta/marks';
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings';
import Code from '@yoopta/code';
import ActionMenuList, {
  DefaultActionMenuRender,
} from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';

import { markdown } from '@yoopta/exports';
import { UploadImage } from '@/hooks/useSubmit';

const plugins = [
  Paragraph,
  Accordion,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Callout,
  NumberedList,
  BulletedList,
  TodoList,
  Code,
  Link,
  Embed,
  Image.extend({
    options: {
      async onUpload(file) {
        const data = await UploadImage(file);
        const response = data.data[0];
        return {
          src: response?.path,
          alt: response?.originalname + 'Images',
          fit: 'cover',
          sizes: {
            height: 500,
            width: 500,
          },
        };
      },
    },
  }),
];

const TOOLS = {
  ActionMenu: {
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
  },
  Toolbar: {
    render: DefaultToolbarRender,
    tool: Toolbar,
  },
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
};

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];
interface MarkdownEditorProps {
  label: string;
  name: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  label,
  onChange,
  placeholder,
  name,
}) => {
  const [field, meta, helpers] = useField(name);
  const editor = useMemo(() => createYooptaEditor(), []);

  const deserializeMarkdown = (markdownString: string) => {
    const value = markdown.deserialize(editor, markdownString);
    return value;
  };

  //   create function markdown export and deserialize functions
  const serializeMarkdown = (value: YooptaContentValue) => {
    const markdownString = markdown.serialize(editor, value);
    return markdownString;
  };

  // Remove the unused checkValue function
  useEffect(() => {
    const handleChange = (value: YooptaContentValue) => {
      const markdownString = serializeMarkdown(value);
      helpers.setValue(markdownString);
      if (onChange) {
        onChange(markdownString);
      }
    };

    editor.on('change', handleChange);
    return () => {
      editor.off('change', handleChange);
    };
  }, [editor, helpers, onChange]);

  useEffect(() => {
    // Initialize editor with deserialized content if field.value is a string
    if (typeof field.value === 'string' && field.value !== '') {
      const initialContent = deserializeMarkdown(field.value);
      editor.setEditorValue(initialContent);
    }
  }, []);

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-black"
      >
        {label}
      </label>
      <div className="overflow-hidden rounded-lg border border-gray-300">
        <YooptaEditor
          editor={editor}
          plugins={plugins}
          tools={TOOLS}
          marks={MARKS}
          placeholder={placeholder}
        />
      </div>
      {meta.touched && meta.error && (
        <div className="mt-1 text-xs text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

export default MarkdownEditor;
