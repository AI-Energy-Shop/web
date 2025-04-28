export const CustomDot = ({ onClick, ...rest }: any) => {
  const { active } = rest;
  // onMove means if dragging or swiping in progress.
  // active is provided by this lib for checking if the item is active or not.

  return (
    <button
      className={`h-2 w-2 bg-slate-400 mx-1 my-3 rounded-lg ${active ? 'w-6' : ''}`}
      onClick={() => onClick()}
    >
      {/* {React.Children.toArray(imageData)[index]} */}
    </button>
  );
};
