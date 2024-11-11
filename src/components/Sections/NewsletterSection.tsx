import React from 'react';
import Forms from '../custom-ui/Forms';

const NewsletterSection = ({ data }: { data: any }) => {
  return (
    <section className="news-letter-section max-w-[1200px] p-5 md:px-0 md:py-5 m-auto">
      <Forms.NewsLetterForm data={data} />
    </section>
  );
};

export default NewsletterSection;
