import React from 'react';
import { motion } from 'framer-motion';

// Blog-Beitragstyp definieren
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Moderne Web-Entwicklung mit React und TypeScript",
    excerpt: "Ein Überblick über die Vorteile der Verwendung von React zusammen mit TypeScript für moderne Webprojekte und wie diese Kombination die Entwicklung beschleunigt.",
    date: "24. April 2025",
    tags: ["React", "TypeScript", "Frontend"],
    slug: "moderne-web-entwicklung-react-typescript"
  },
  {
    id: 2,
    title: "Responsive Design: Best Practices für 2025",
    excerpt: "Wie man responsive Websites entwickelt, die auf allen Geräten perfekt funktionieren. Tipps und Tricks für modernes responsives Webdesign.",
    date: "20. April 2025",
    tags: ["Responsive Design", "CSS", "UI/UX"],
    slug: "responsive-design-best-practices-2025"
  },
  {
    id: 3,
    title: "Die Bedeutung von SEO für Entwickler",
    excerpt: "Warum technisches SEO für Webentwickler wichtig ist und wie du deine Projekte von Anfang an suchmaschinenfreundlich gestalten kannst.",
    date: "15. April 2025",
    tags: ["SEO", "Web Performance", "Best Practices"],
    slug: "bedeutung-seo-entwickler"
  }
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Blog & Insights</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Gedanken, Tutorials und Einblicke in die Welt der Webentwicklung. Hier teile ich mein Wissen und meine Erfahrungen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: post.id * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-600 text-xs font-semibold rounded-full text-white">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white hover:text-blue-400 transition-colors">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h3>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                  >
                    Weiterlesen →
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/blog"
            className="inline-block px-6 py-3 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full transition-colors duration-300"
          >
            Alle Blogbeiträge anzeigen
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
