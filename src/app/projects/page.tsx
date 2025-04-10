import Header from '@/components/projects/header';
import ProjectCard from '@/components/projects/project-card';
import { PROJECTS } from '@/lib/constants';

export default function Projects() {
  return (
    <section className="max-w-[880px] mx-auto mt-6 mb-4 sm:px-0 px-3 sm:pb-0 pb-3">
      <Header />
      <div className="grid grid-cols-1 gap-4">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
