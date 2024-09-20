import Components from "@/components";
import { homePage } from "./actions/home-page";

export default async function HomePage() {
  const res = await homePage();
  return (
    <main className="w-full min-h-screen bg-yellow-light-yellow-50 ">
      <Components.Sections.BannerSection
        data={res.homePage.data.attributes.banner_images}
      />

      <Components.Sections.AboutusSection
        data={res.homePage.data.attributes.about_section}
      />

      <Components.Sections.ContactusSection
        data={res.homePage.data.attributes.contactus_section}
      />

      <Components.Sections.NewsletterSection />
    </main>
  );
}
