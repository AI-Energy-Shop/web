import { toast, ToasterProps } from 'sonner';
type Message = string;
type Type = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
type Position = ToasterProps['position'];
type Theme = ToasterProps['theme'];

type Config = {
  position?: Position;
  theme?: Theme;
};

export function Toast(message: Message, type: Type, config?: Config) {
  switch (type) {
    case 'SUCCESS':
      toast.success(message, { ...config });
      break;
    case 'WARNING':
      toast.warning(message, { ...config });
      break;
    case 'ERROR':
      toast.error(message, { ...config });
      break;
    default:
      toast.info(message, { ...config });
      break;
  }
}
