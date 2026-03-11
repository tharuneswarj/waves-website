import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getAllProjects,
} from "@/lib/projects";
import ScrollReveal from "@/components/ScrollReveal";
import PlaceholderImage from "@/components/PlaceholderImage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found - Waves Company" };

  return {
    title: `${project.title} - Waves Company`,
    description: `${project.type}. ${project.location}, ${project.year}.`,
  };
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // Find next project for navigation
  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <main className="pt-24">
      {/* ─── Section 1: Hero Image ─── */}
      <section className="px-6 pt-8 lg:pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-lg">
            <PlaceholderImage
              label={`${project.title} — hero installation photograph`}
              aspect="aspect-[21/9]"
              className="min-h-[280px] md:min-h-[400px]"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/80 via-primary/30 to-transparent p-6 md:p-10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-surface/50">
                {project.year} &middot; {project.location}
              </span>
              <h1 className="mt-2 text-3xl text-surface md:text-5xl">
                {project.title}
              </h1>
              <p className="mt-2 font-sans text-sm font-normal text-surface/70 md:text-base">
                {project.type}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 2: Brief & Response ─── */}
      <section className="px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-8 text-3xl md:text-4xl">The Brief</h2>
            <p className="text-base font-light leading-relaxed text-primary/80 md:text-lg">
              {project.brief}
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="mb-6 mt-14 text-3xl md:text-4xl">Our Response</h2>
          </ScrollReveal>
          <div className="space-y-5">
            {project.response.map((paragraph, i) => (
              <ScrollReveal key={i}>
                <p className="text-base font-light leading-relaxed text-primary/80 md:text-lg">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 3: Project Gallery ─── */}
      <section className="px-6 pb-section lg:pb-section-lg">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="mb-8 text-3xl md:text-4xl">Gallery</h2>
          </ScrollReveal>

          {project.gallery.length > 0 ? (
            <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
              {/* Masonry layout for real images — future CMS content */}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                "Wide installation view",
                "Detail — single pendant",
                "Detail — layer texture",
                "Context — meeting room from entry",
                "Process — printing in progress",
                "Detail — base and hardware",
              ].map((label, i) => (
                <ScrollReveal key={label} delay={i * 0.06}>
                  <PlaceholderImage
                    label={`${project.title} — ${label}`}
                    aspect={i % 3 === 0 ? "aspect-[4/3]" : "aspect-square"}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Section 4: Technical Details ─── */}
      <section className="bg-primary px-6 py-section lg:py-section-lg">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="mb-8 text-3xl text-surface md:text-4xl">
              Technical Details
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="overflow-hidden rounded-lg border border-surface/15">
              <table className="w-full">
                <tbody className="divide-y divide-surface/10">
                  {Object.entries(project.specs).map(([label, value]) => (
                    <tr key={label}>
                      <td className="px-5 py-3.5 font-mono text-xs tracking-wide text-surface/50">
                        {label}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs tracking-wide text-surface/90">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Section 5: Next Project ─── */}
      {nextProject && nextProject.slug !== slug && (
        <section className="px-6 py-section lg:py-section-lg">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <p className="font-mono text-xs uppercase tracking-widest text-primary/40">
                Next project
              </p>
              <Link
                href={`/studio/${nextProject.slug}`}
                className="mt-3 inline-block text-3xl transition-colors hover:text-accent md:text-4xl"
              >
                {nextProject.title}
              </Link>
              <p className="mt-2 text-sm font-normal text-primary/50">
                {nextProject.type}
              </p>
            </ScrollReveal>
          </div>
        </section>
      )}
    </main>
  );
}
