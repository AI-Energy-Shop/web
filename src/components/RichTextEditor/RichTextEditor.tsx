'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import { FC } from 'react';
import StarterKit from '@tiptap/starter-kit';
import ToolBar from './ToolBar';
// import UnderlineExt from '@tiptap/extension-underline'
// import OrderedListEx from '@tiptap/extension-ordered-list'
// import HeadingExt from '@tiptap/extension-heading';
import TextStyleEx from '@tiptap/extension-text-style';
import TypographyEX from '@tiptap/extension-typography';
import TextAlignEx from '@tiptap/extension-text-align';

interface RichTextEditorProps {
  description: string;
  setDescription: any;
  className: string;
  iconSize?: number;
}

const RichTextEditor: FC<RichTextEditorProps> = ({ description, setDescription, className, iconSize }) => {
  const editor = useEditor({
    content: description,
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      TextAlignEx.configure(),
      // HeadingExt.configure({
      //   levels: [1, 2, 3, 4, 5, 6],
      // }),
      // OrderedListEx.configure(),
      TextStyleEx.configure(),
      TypographyEX.configure(),
    ],
    editorProps: {
      attributes: {
        class: `text-sm ${className}`,
      },
    },
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md">
      <ToolBar editor={editor} iconSize={iconSize} />
      <EditorContent editor={editor} scrolling="true" />
    </div>
  );
};

export default RichTextEditor;
