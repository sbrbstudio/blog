import type { Metadata } from "next";
import Image from "next/image";
import { author } from "@/content/articles";
import { assetPath, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Lin Yu is an independent designer and writer exploring the intersection of thoughtful technology and everyday life.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Lin Yu — Commonplace",
    description:
      "An independent designer and writer exploring the intersection of thoughtful technology and everyday life.",
    url: "/about",
    type: "profile",
  },
};

const interests = [
  ["Interface design", "Editorial systems, interaction detail, and quiet software"],
  ["Typography", "Latin and Chinese type, reading rhythm, and digital craft"],
  ["Product thinking", "Defaults, information architecture, and humane technology"],
  ["Writing", "Technical tutorials, field notes, and durable working methods"],
];

const projects = [
  ["Commonplace", "One complete guide to building and editing a thoughtful website"],
  ["Website Editing Guide", "A complete workflow from content model to deployment"],
  ["Small Systems", "An ongoing study of tools that ask for less attention"],
];

export default function AboutPage() {
  return (
    <main id="main-content">
      <header className="container about-hero">
        <div>
          <span className="eyebrow">About the author</span>
          <h1 className="about-title">
            Designing for clarity in a world that rarely slows down.
          </h1>
          <p className="about-lead">
            I&apos;m Lin, an independent designer and writer. I spend my days
            shaping digital products and my quieter hours thinking about how
            technology can feel more considered, legible, and human.
          </p>
        </div>
        <div className="about-portrait">
          <Image
            src={assetPath(author.avatar)}
            alt={`Abstract portrait of ${author.name}`}
            width={320}
            height={320}
            priority
          />
        </div>
      </header>

      <section className="container about-grid" aria-labelledby="about-story">
        <span className="about-side-label">Profile / 01</span>
        <div className="about-content">
          <h2 id="about-story">A little context</h2>
          <p>
            For the past decade I&apos;ve worked at the meeting point of
            product design, editorial systems, and front-end craft. I&apos;m
            most interested in the work that happens before something looks
            polished: understanding the problem, finding the right rhythm, and
            removing the details that make a simple idea harder to use.
          </p>
          <p>
            My background is in <strong>digital product design</strong> and{" "}
            <strong>front-end engineering</strong>. That combination has made
            me suspicious of beautiful screens that become fragile the moment
            they meet real content. I care about the parts that hold: type
            that remains readable, navigation that stays predictable, and
            interfaces that are comfortable to return to.
          </p>
          <p>
            Commonplace is where I keep one complete website editing guide:
            the practical system I use to move from content structure and
            visual rules to implementation, launch, and ongoing maintenance.
          </p>

          <h2>What I&apos;m interested in</h2>
          <div className="interest-list">
            {interests.map(([title, description]) => (
              <div className="interest-row" key={title}>
                <span>{title}</span>
                <span>{description}</span>
              </div>
            ))}
          </div>

          <h2>Selected work</h2>
          <div className="project-list">
            {projects.map(([title, description]) => (
              <div className="project-row" key={title}>
                <span>{title}</span>
                <span>{description}</span>
              </div>
            ))}
          </div>

          <h2>Say hello</h2>
          <p>
            I&apos;m always happy to hear from people thinking carefully about
            interfaces, writing, or the relationship between the two. The
            fastest way to reach me is email.
          </p>
          <div className="about-links">
            <a href={`mailto:${siteConfig.social.email}`}>Email</a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </a>
            <a
              href={siteConfig.social.x}
              target="_blank"
              rel="noreferrer noopener"
            >
              X / Twitter
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
