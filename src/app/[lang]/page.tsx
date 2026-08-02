import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getMergedContent } from "@/lib/cms";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getMergedContent(lang as Locale);
  return (
    <>
      <Hero dict={dict} />
      <Services dict={dict} />
      <Projects dict={dict} />
      <About dict={dict} />
      <Contact dict={dict} />
    </>
  );
}
