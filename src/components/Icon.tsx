import { LucideProps } from 'lucide-react';
import * as Icons from 'lucide-react';

interface IconProps extends LucideProps {
  name: string;
}

const Icon = ({ name, ...props }: IconProps) => {
  // Convert kebab-case to PascalCase
  const pascalCaseName = name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') as keyof typeof Icons;

  const IconComponent = Icons[
    pascalCaseName
  ] as React.ComponentType<LucideProps>;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide icons`);
    return null;
  }

  return <IconComponent {...props} />;
};

export default Icon;
