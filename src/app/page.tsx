import Components from "@/components";
import { homePage } from "@/app/actions/home-page";

export default async function HomePage() {
  const data = await homePage();

  if (data && data.homePage && !data.homePage.data) {
    return null;
  }

  return (
    <main className="w-full min-h-screen bg-yellow-light-yellow-50 ">
      <Components.Sections.BannerSection
        bannerImages={data.homePage.data.attributes.banner_images}
      />

      <Components.Sections.AboutusSection
        data={data.homePage.data.attributes.about_section}
      />

      <Components.Sections.ContactusSection
        data={data.homePage.data.attributes.contactus_section}
      />

      <Components.Sections.NewsletterSection />
    </main>
  );
}
