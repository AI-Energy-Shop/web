import React from 'react';
import { number } from 'zod';

interface SpacerProps {
  classStyle: string;
}
const Spacer: React.FC<SpacerProps> = ({ classStyle }) => {
  return <div className={`${classStyle}`}></div>;
};

export default Spacer;
