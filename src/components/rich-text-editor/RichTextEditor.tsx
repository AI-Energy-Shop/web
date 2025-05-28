'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyleEx from '@tiptap/extension-text-style';
import TypographyEX from '@tiptap/extension-typography';
import TextAlignEx from '@tiptap/extension-text-align';
import ToolBar from './ToolBar';
import { FC } from 'react';
import SkeletonRichTextEditor from './SkeletonLoader';
// import UnderlineExt from '@tiptap/extension-underline'
// import OrderedListEx from '@tiptap/extension-ordered-list'
// import HeadingExt from '@tiptap/extension-heading';

interface RichTextEditorProps {
  description: string;
  setDescription: any;
  className: string;
  iconSize?: number;
}

const RichTextEditor: FC<RichTextEditorProps> = ({
  description,
  setDescription,
  className,
  iconSize,
}) => {
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
    return <SkeletonRichTextEditor />;
  }

  return (
    <div className="border rounded-md">
      <ToolBar editor={editor} iconSize={iconSize} />
      <EditorContent editor={editor} scrolling="true" />
    </div>
  );
};

export default RichTextEditor;
