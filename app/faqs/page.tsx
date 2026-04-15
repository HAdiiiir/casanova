"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, HelpCircle, Phone, MessageCircle } from "lucide-react";

const faqCategories = [
  {
    name: "Buying Process",
    faqs: [
      {
        question: "How do I start the property buying process?",
        answer: "Starting the buying process is simple. Browse our listings online, schedule property viewings, and once you find your ideal property, our team will guide you through reservation, documentation, and contract signing.",
      },
      {
        question: "What documents do I need to purchase a property?",
        answer: "You will typically need: a valid National ID or Passport, proof of address, proof of income (salary slips or bank statements), and the down payment. Requirements may vary based on the developer and financing method.",
      },
      {
        question: "How long does the purchasing process take?",
        answer: "The typical timeline is 2-4 weeks from reservation to contract signing. This includes document verification, payment processing, and legal review. Property delivery timelines vary by project (usually 1-4 years for new developments).",
      },
      {
        question: "Can foreigners buy property in Egypt?",
        answer: "Yes, foreigners can purchase property in Egypt. There are some restrictions on certain strategic areas, but most residential and tourist areas are open for foreign ownership. Our team specializes in helping international buyers.",
      },
    ],
  },
  {
    name: "Payment & Financing",
    faqs: [
      {
        question: "What payment options are available?",
        answer: "We offer multiple payment options: cash payment (usually with discounts), installment plans (ranging from 1-10 years depending on the developer), and bank financing/mortgage options. Each project has specific payment structures.",
      },
      {
        question: "What is the typical down payment required?",
        answer: "Down payments typically range from 5% to 25% of the property value, depending on the developer and payment plan chosen. Some projects offer 0% down payment options with extended installment periods.",
      },
      {
        question: "Can I get a mortgage for property purchase?",
        answer: "Yes, we work with major Egyptian banks that offer mortgage financing for both Egyptian and foreign buyers. Terms typically include up to 80% financing with repayment periods of 10-20 years. Our team can help facilitate bank applications.",
      },
      {
        question: "Are there any additional fees beyond the property price?",
        answer: "Additional costs may include: registration fees (typically 3-5% of property value), maintenance fees, club membership fees (for compounds), and finishing costs if buying a shell unit. We provide full cost breakdowns before purchase.",
      },
    ],
  },
  {
    name: "Property Types",
    faqs: [
      {
        question: "What types of properties do you offer?",
        answer: "We offer a wide range of properties including: apartments, villas, townhouses, twin houses, penthouses, duplexes, chalets, and commercial units. Properties are available in various stages from under construction to ready for delivery.",
      },
      {
        question: "What is the difference between shell and finished units?",
        answer: "Shell units (core & shell) come with basic structure, windows, doors, and utilities but require interior finishing. Finished units include complete interior finishing, fixtures, and are ready to move in or furnish.",
      },
      {
        question: "What amenities are typically included in compounds?",
        answer: "Most compounds include: 24/7 security, landscaped gardens, swimming pools, sports facilities, clubhouses, commercial areas, schools nearby, and mosques. Premium compounds may include golf courses, marinas, and beach access.",
      },
    ],
  },
  {
    name: "After Purchase",
    faqs: [
      {
        question: "Can I resell my property before completing payments?",
        answer: "Yes, in most cases. You can assign your contract to a new buyer. Terms vary by developer - some allow immediate resale while others have restrictions for a certain period. Contact us for guidance on your specific situation.",
      },
      {
        question: "What support do you provide after purchase?",
        answer: "We provide comprehensive after-sale support including: property handover assistance, developer communication, maintenance coordination, rental management services (optional), and resale assistance when you are ready to sell.",
      },
      {
        question: "How do I handle property maintenance?",
        answer: "For compound properties, maintenance is typically handled by the management company with monthly/annual fees. For standalone properties, you can arrange private maintenance or use our recommended service providers.",
      },
      {
        question: "Can you help me rent out my property?",
        answer: "Yes, we offer property management and rental services. We can help you find tenants, manage the property, handle maintenance, and ensure rent collection. Contact us for our rental management packages.",
      },
    ],
  },
  {
    name: "Legal & Documentation",
    faqs: [
      {
        question: "How do I verify property ownership and legitimacy?",
        answer: "We only work with licensed, reputable developers. All properties come with proper documentation including: land ownership documents, building permits, project licenses, and registered contracts. Our legal team reviews all transactions.",
      },
      {
        question: "What is included in the property contract?",
        answer: "Contracts include: property specifications, payment schedule, delivery date, finishing specifications, penalties for delays, ownership transfer terms, and dispute resolution mechanisms. We recommend legal review before signing.",
      },
      {
        question: "When do I receive the property title deed?",
        answer: "Title deeds are typically issued after full payment completion and project registration. For installment purchases, you receive the deed upon final payment. The process timeline varies by developer and government processing.",
      },
    ],
  },
];

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = faqCategories.map((category) => ({
    ...category,
    faqs: category.faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.faqs.length > 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find answers to common questions about buying property with Casanova Real Estate.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold font-serif mb-6 pb-2 border-b">
                    {category.name}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-3">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`${category.name}-${faqIndex}`}
                        className="bg-card rounded-lg border px-4"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <span className="font-medium">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Search className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-6">
                  We could not find any questions matching &quot;{searchQuery}&quot;
                </p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold font-serif mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-8">
              Our support team is here to help with any questions not covered above.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us
                </Button>
              </Link>
              <Link href="/support">
                <Button variant="outline" size="lg">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Support Center
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}