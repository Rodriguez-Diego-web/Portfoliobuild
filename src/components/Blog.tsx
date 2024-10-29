import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Blog = () => {
  const posts = [
    {
      title: "The Future of Web Development: What's Next in 2024",
      excerpt: 'Exploring upcoming trends in web development, from AI integration to new frameworks.',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800&h=400',
      date: 'Mar 15, 2024',
      readTime: '5 min read',
      category: 'Web Development'
    },
    {
      title: 'Mastering TypeScript: Advanced Tips and Tricks',
      excerpt: 'Deep dive into TypeScript features that will level up your development game.',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800&h=400',
      date: 'Mar 10, 2024',
      readTime: '7 min read',
      category: 'TypeScript'
    },
    {
      title: 'Building Scalable React Applications',
      excerpt: 'Best practices for creating maintainable and scalable React applications.',
      image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800&h=400',
      date: 'Mar 5, 2024',
      readTime: '6 min read',
      category: 'React'
    }
  ];

  return (
    <section id="blog" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">Latest Articles</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <ScrollReveal key={index} delay={index * 0.2}>
              <motion.article
                whileHover={{ y: -10 }}
                className="bg-dark-200 rounded-xl overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-forest-400 text-white text-sm rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-100 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                  <motion.a
                    href="#"
                    className="inline-flex items-center text-forest-400 hover:text-forest-500"
                    whileHover={{ x: 5 }}
                  >
                    Read More
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </motion.a>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;