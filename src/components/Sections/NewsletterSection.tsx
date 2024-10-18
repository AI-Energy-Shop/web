import React from 'react';
import Forms from '../WebsiteUI/Forms';
import NEWS_LETTER_OPRATION from '@/graphql/newsletter-section';
import { useQuery } from '@apollo/client';

const NewsletterSection = ({ data }: { data: any }) => {
  return (
    <section className="news-letter-section max-w-[1200px] p-5 md:px-0 md:py-5 m-auto">
      <Forms.NewsLetterForm data={data} />
    </section>
  );
};

export default NewsletterSection;
