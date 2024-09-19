import Components from "@/components";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-yellow-light-yellow-50 ">
      {/* <Components.Sections.BannerSection />

      <Components.Sections.AboutusSection /> */}

      <Components.Sections.ContactusSection />

      <Components.Sections.NewsletterSection />
    </main>
  );
}
