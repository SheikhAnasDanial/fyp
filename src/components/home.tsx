import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
  LaptopIcon,
  HeartIcon,
  BrainIcon,
  HelpCircleIcon,
  MailIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "./Navbar";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real implementation, this would update the theme in the document
    document.documentElement.classList.toggle("dark");
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div
      className={`min-h-screen bg-white dark:bg-gray-900 ${isDarkMode ? "dark" : ""}`}
    >
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        </div>

        <motion.div
          className="max-w-5xl mx-auto text-center z-10"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Find Your Perfect{" "}
            <span className="text-blue-600 dark:text-blue-400">Laptop</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Laptify uses advanced algorithms to match you with the ideal laptop
            based on your unique needs and preferences.
          </p>
          <Button
            size="lg"
            className="rounded-full px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Get Started
          </Button>

          <motion.div
            className="mt-12"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDownIcon className="h-8 w-8 mx-auto text-gray-400 dark:text-gray-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover how Laptify makes finding your perfect laptop effortless.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: (
                  <BrainIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                ),
                title: "Smart Recommendations",
                description:
                  "Our clustering algorithm analyzes thousands of laptops to find your perfect match.",
              },
              {
                icon: (
                  <LaptopIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                ),
                title: "Comprehensive Specs",
                description:
                  "Compare detailed specifications to make an informed decision.",
              },
              {
                icon: (
                  <HeartIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                ),
                title: "Save Favorites",
                description:
                  "Save and compare your top choices to find the best laptop for your needs.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                variants={fadeIn}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Finding your perfect laptop is just a few steps away.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                step: "01",
                title: "Create an Account",
                description:
                  "Sign up to get started with personalized recommendations.",
              },
              {
                step: "02",
                title: "Share Your Preferences",
                description:
                  "Tell us about your needs, budget, and how you'll use your laptop.",
              },
              {
                step: "03",
                title: "Get Recommendations",
                description:
                  "Our algorithm will match you with the perfect laptops for your needs.",
              },
              {
                step: "04",
                title: "Compare & Choose",
                description:
                  "Compare your top matches and make an informed decision.",
              },
            ].map((step, index) => (
              <motion.div key={index} className="relative" variants={fadeIn}>
                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-blue-600 dark:bg-blue-400"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                About Laptify
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Laptify was created by a team of tech enthusiasts who were
                frustrated with the overwhelming process of finding the right
                laptop. We combined our expertise in machine learning and user
                experience to create a platform that makes laptop shopping
                simple and personalized.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Our mission is to help everyone find the perfect laptop that
                meets their needs without the confusion and technical jargon
                that often comes with tech shopping.
              </p>
              <Button
                variant="outline"
                className="rounded-full px-6 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800"
              >
                Learn More About Our Team
              </Button>
            </motion.div>
            <motion.div variants={fadeIn} className="relative">
              <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=800&q=80"
                  alt="Team working on laptops"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-100 dark:bg-blue-900 rounded-full opacity-50 z-0"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section
        id="faqs"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about Laptify.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "How does Laptify's recommendation system work?",
                  answer:
                    "Laptify uses a clustering algorithm that analyzes your preferences and needs, then matches them with laptops that have similar characteristics to what you're looking for. This ensures you get personalized recommendations that truly fit your requirements.",
                },
                {
                  question: "Is Laptify free to use?",
                  answer:
                    "Yes, Laptify's core recommendation service is completely free to use. We may offer premium features in the future, but our basic recommendation system will always remain free.",
                },
                {
                  question: "How accurate are the recommendations?",
                  answer:
                    "Our algorithm has been trained on thousands of laptop specifications and user preferences, resulting in highly accurate recommendations. However, personal preferences can vary, which is why we provide detailed information about each recommendation to help you make the final decision.",
                },
                {
                  question: "Can I compare different laptop recommendations?",
                  answer:
                    "Absolutely! You can save laptops to your favorites and use our comparison tool to view them side by side, making it easy to see the differences and similarities between your top choices.",
                },
                {
                  question: "How often is the laptop database updated?",
                  answer:
                    "We update our database regularly to include the latest laptop models and specifications, ensuring you always have access to current options in the market.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeIn}>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  ></textarea>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Send Message
                </Button>
              </form>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl"
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MailIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 mt-1" />
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      Email
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      support@laptify.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <HelpCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 mt-1" />
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      Support
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our support team is available Monday through Friday, 9am
                      to 5pm PST.
                    </p>
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Follow Us
                  </h4>
                  <div className="flex space-x-4">
                    {["twitter", "facebook", "instagram", "linkedin"].map(
                      (social, index) => (
                        <a
                          key={index}
                          href="#"
                          className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <span className="sr-only">{social}</span>
                          <div className="h-5 w-5"></div>
                        </a>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Laptify
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
                Making laptop recommendations simple and personalized with
                advanced algorithms and a user-friendly interface.
              </p>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {isDarkMode ? (
                    <SunIcon className="h-5 w-5 mr-2" />
                  ) : (
                    <MoonIcon className="h-5 w-5 mr-2" />
                  )}
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {[
                  "Home",
                  "Features",
                  "How It Works",
                  "About Us",
                  "FAQs",
                  "Contact",
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={`#${link.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-2">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "Disclaimer",
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Laptify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
