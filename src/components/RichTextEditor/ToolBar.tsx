import { Fragment, useState } from 'react';
import {
  Bold,
  Disc,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Pilcrow,
  Table,
  Underline,
} from 'lucide-react';
import { Editor } from '@tiptap/react';
import { Toggle } from '@/components/ui/toggle';
import TableSelector from './TableSelector';

interface SubOption {
  name: string;
  icon: JSX.Element | null;
  isActive: boolean;
  onClick: () => boolean;
}

interface TempSubOption {
  name: string;
  isActive: boolean;
  icon: JSX.Element | null;
  ui: React.ReactElement | null;
  onClick: () => boolean;
}

interface Option {
  name: string;
  icon: JSX.Element | null;
  isActive: boolean;
  onClick: () => boolean;
  options?: SubOption[];
  temporary_options?: TempSubOption[];
  className: string;
}

const ToolBar = ({
  editor,
  iconSize,
}: {
  editor: Editor;
  iconSize?: number;
}) => {
  // State to track the selected icon for each group by index
  const [selectedIcons, setSelectedIcons] = useState<{
    [key: number]: JSX.Element | null;
  }>({});

  const options: Option[] = [
    {
      name: 'Heading',
      icon: <Heading size={iconSize} />,
      isActive: false,
      onClick: () => false,
      options: [
        {
          name: 'H1',
          icon: <Heading1 size={iconSize} />,
          isActive: false,
          onClick: () =>
            editor.chain().focus().toggleHeading({ level: 1 }).run(),
        },
        {
          name: 'H2',
          icon: <Heading2 size={iconSize} />,
          isActive: false,
          onClick: () =>
            editor.chain().focus().toggleHeading({ level: 2 }).run(),
        },
        {
          name: 'H3',
          icon: <Heading3 size={iconSize} />,
          isActive: false,
          onClick: () =>
            editor.chain().focus().toggleHeading({ level: 3 }).run(),
        },
        {
          name: 'H4',
          icon: <Heading4 size={iconSize} />,
          isActive: false,
          onClick: () =>
            editor.chain().focus().toggleHeading({ level: 4 }).run(),
        },
        {
          name: 'H5',
          icon: <Heading5 size={iconSize} />,
          isActive: false,
          onClick: () =>
            editor.chain().focus().toggleHeading({ level: 5 }).run(),
        },
        {
          name: 'H6',
          icon: <Heading6 size={iconSize} />,
          isActive: false,
          onClick: () =>
            editor.chain().focus().toggleHeading({ level: 6 }).run(),
        },
        // {
        //   name: "P",
        //   icon: <Pilcrow size={iconSize} />,
        // 	isActive: false,
        //   onClick: () => editor.chain().focus().to({ level: }).run(),
        // },
      ],
      temporary_options: undefined,
      className:
        'bg-secondary flex gap-1 p-1 mt-2 rounded-md hidden group-hover:flex',
    },
    {
      name: 'Bold',
      icon: <Bold size={iconSize} />,
      isActive: false,
      onClick: () => editor.chain().focus().toggleBold().run(),
      options: undefined,
      temporary_options: undefined,
      className: '',
    },
    {
      name: 'Italic',
      icon: <Italic size={iconSize} />,
      isActive: false,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      options: undefined,
      temporary_options: undefined,
      className: '',
    },
    {
      name: 'Underline',
      icon: <Underline size={iconSize} />,
      isActive: false,
      onClick: () => true, //editor.chain().focus().toggleUnderline().run(),
      options: undefined,
      temporary_options: undefined,
      className: '',
    },
    {
      name: 'Unordered List',
      icon: <List size={iconSize} />,
      isActive: false,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      options: undefined,
      temporary_options: undefined,
      className:
        'bg-secondary flex gap-1 p-1 mt-2 rounded-md hidden group-hover:flex',
    },
    {
      name: 'Ordered List',
      icon: <ListOrdered size={iconSize} />,
      isActive: false,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      options: undefined,
      temporary_options: undefined,
      className:
        'bg-secondary flex gap-1 p-1 mt-2 rounded-md hidden group-hover:flex',
    },
    {
      name: 'Table',
      icon: <Table size={iconSize} />,
      isActive: false,
      onClick: () => true,
      options: undefined,
      temporary_options: [
        {
          name: 'Select number of rows and columns',
          icon: null,
          ui: <TableSelector />,
          isActive: false,
          onClick: () => true,
        },
      ],
      className: 'bg-secondary hidden group-hover:block mt-2',
    },
  ];

  const handleClick = (
    groupIndex: number,
    item?: Option | SubOption | TempSubOption
  ) => {
    if (item?.icon) {
      setSelectedIcons((prev) => ({
        ...prev,
        [groupIndex]: item?.icon,
      }));
    }

    item?.onClick();
  };

  return (
    <div className="p-1 border-b">
      {/* <TableSelector /> */}
      <div className="flex items-center gap-1">
        {options.map((item, i) => (
          <div key={i} className="icon-group relative group">
            <div className="absolute z-10 top-8 left-0 hidden group-hover:block">
              {item.options && (
                <div key={i} className={item.className}>
                  {item.options.map((subOpt, ind) => (
                    <Toggle
                      key={ind}
                      title={subOpt.name}
                      size="sm"
                      variant="outline"
                      onClick={() => handleClick(i, subOpt)}
                    >
                      {subOpt.icon}
                    </Toggle>
                  ))}
                </div>
              )}
              {item.temporary_options && (
                <div key={i} className={item.className}>
                  {item.temporary_options.map((subOpt, ind) => (
                    <Fragment key={ind}>{subOpt.ui}</Fragment>
                  ))}
                </div>
              )}
            </div>
            {/* Toggle Button */}
            <Toggle
              title={item.name}
              size="sm"
              variant="outline"
              onClick={() => handleClick(i, item)}
            >
              {selectedIcons[i] || item.icon}
            </Toggle>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolBar;
