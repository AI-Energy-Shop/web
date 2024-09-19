"use client";
import React from "react";
import Forms from "../UI/Forms";
import NEWS_LETTER_OPRATION from "@/graphql/newsletter-section";
import { useQuery } from "@apollo/client";

const NewsletterSection = () => {
  const { data, loading } = useQuery(
    NEWS_LETTER_OPRATION.Queries.newsLetterSection
  );

  if (loading || !data?.newsletterForm?.data) {
    return null;
  }

  return (
    <section className="news-letter-section max-w-[1200px] p-5 md:px-0 md:py-5 m-auto">
      <Forms.NewsLetterForm data={data?.newsletterForm?.data.attributes} />
    </section>
  );
};

export default NewsletterSection;
