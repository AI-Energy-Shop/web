import { ComponentFormInquiry } from '@/lib/types';
import Forms from '../custom-ui/Forms';
import React from 'react';

interface InquirySectionProps {
  data: ComponentFormInquiry;
}
const InquerySection: React.FC<InquirySectionProps> = ({ data }) => {
  return (
    <section className="w-full h-auto">
      <Forms.InquiryForm data={data} />
    </section>
  );
};

export default InquerySection;
