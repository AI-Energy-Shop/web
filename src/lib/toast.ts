import { toast, ToasterProps } from 'sonner';
type Message = string;
type Type = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';

export function Toast(message: Message, type: Type, config?: ToasterProps) {
  switch (type) {
    case 'SUCCESS':
      toast.success(message, { ...config });
      break;
    case 'WARNING':
      toast.warning(message, { ...config });
      break;
    case 'ERROR':
      toast.error(message, {
        ...config,
        className: 'text-red',
      });
      break;
    default:
      toast.info(message, { ...config });
      break;
  }
}
