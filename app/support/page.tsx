"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  HelpCircle,
  FileText,
  AlertCircle,
  CreditCard,
  Home,
  Search,
  Send,
  Loader2,
  Clock,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

const supportCategories = [
  { id: "general", label: "General Inquiry", icon: HelpCircle },
  { id: "property", label: "Property Information", icon: Home },
  { id: "payment", label: "Payment & Financing", icon: CreditCard },
  { id: "complaint", label: "File a Complaint", icon: AlertCircle },
  { id: "documents", label: "Documents & Contracts", icon: FileText },
  { id: "technical", label: "Technical Support", icon: Search },
];

const faqs = [
  {
    question: "How do I schedule a property viewing?",
    answer: "You can schedule a property viewing by clicking the 'Schedule Visit' button on any property page, or by contacting our support team directly. We offer flexible viewing times including weekends.",
  },
  {
    question: "What documents do I need to purchase a property?",
    answer: "Typically, you will need a valid ID (National ID or Passport), proof of income or bank statements, and down payment documentation. Our team will guide you through the specific requirements based on the developer.",
  },
  {
    question: "What are the payment options available?",
    answer: "We offer various payment plans including cash payments, installment plans (up to 10 years), and bank financing options. Each project may have different payment structures which we can explain in detail.",
  },
  {
    question: "Can I resell my property before completing payments?",
    answer: "Yes, in most cases you can resell your property. However, this depends on the developer's policies and any restrictions in your contract. Contact our team for specific guidance on your situation.",
  },
  {
    question: "What is included in the property price?",
    answer: "The property price typically includes the unit and basic finishes. Additional features like furniture, appliances, or premium finishes may be available at extra cost. Maintenance fees and club memberships are usually separate.",
  },
  {
    question: "How long does the purchasing process take?",
    answer: "The purchasing process typically takes 2-4 weeks from reservation to contract signing. This includes document verification, payment processing, and legal review. Delivery timelines vary by project.",
  },
  {
    question: "Do you offer after-sale support?",
    answer: "Yes, we provide comprehensive after-sale support including assistance with property handover, developer communication, and any post-purchase concerns. Our support team is available to help throughout your ownership journey.",
  },
  {
    question: "Can foreigners purchase property in Egypt?",
    answer: "Yes, foreigners can purchase property in Egypt with some restrictions on certain areas. Our team specializes in helping international buyers navigate the process and can provide detailed guidance.",
  },
];

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    description: "Talk to our team directly",
    contact: "+20 100 123 4567",
    availability: "Sun-Thu: 9AM-6PM",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Get a response within 24 hours",
    contact: "support@casanovarealestate.com",
    availability: "24/7 Email Support",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team",
    contact: "Start Chat",
    availability: "Sun-Thu: 9AM-6PM",
  },
];

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Your support request has been submitted. We will contact you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

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
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-6">
              Support Center
            </h1>
            <p className="text-lg text-muted-foreground">
              We are here to help. Find answers to common questions or reach out to our support team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow text-center">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{method.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                      <p className="font-medium text-primary">{method.contact}</p>
                      <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {method.availability}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Form & FAQs */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Support Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">Submit a Request</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we will get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+20 100 123 4567"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {supportCategories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Brief description of your request"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please provide as much detail as possible..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Submit Request
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Support Categories */}
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {supportCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setFormData({ ...formData, category: cat.id })}
                        className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-muted transition-colors text-left"
                      >
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="text-sm">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold font-serif mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-lg border px-4">
                    <AccordionTrigger className="text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Additional Help */}
              <Card className="mt-8 bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Still need help?</h3>
                  <p className="text-primary-foreground/80 mb-4">
                    Our support team is ready to assist you with any questions or concerns.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/contact">
                      <Button variant="secondary" size="sm">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Us
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="border-primary-foreground/30 hover:bg-primary-foreground/10">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Live Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Response Times */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold font-serif mb-4">Our Response Commitment</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are committed to providing timely and helpful support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { time: "< 2 hours", label: "Phone Support", desc: "During business hours" },
              { time: "< 24 hours", label: "Email Support", desc: "For all inquiries" },
              { time: "< 48 hours", label: "Complex Issues", desc: "Requiring investigation" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <CardContent className="p-6">
                    <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold text-primary mb-1">{item.time}</div>
                    <h3 className="font-medium">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}