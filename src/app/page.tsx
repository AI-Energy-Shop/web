import Components from "@/components";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-yellow-light-yellow-50 ">
      <Components.Sections.BannerSection />

      <Components.Sections.AboutusSection />

      <Components.Sections.ContactusSection />

      <section className="news-letter-section max-w-[1200px] p-5 md:px-0 md:py-5 m-auto">
        <Components.Forms.NewsLetterForm />
      </section>
    </main>
  );
}
