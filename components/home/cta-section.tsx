import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-primary-foreground mb-6">
            Ready to Find Your
            <span className="block">Dream Property?</span>
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Our expert team is ready to help you navigate your real estate journey. 
            Contact us today for personalized assistance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto">
                <MessageCircle className="h-5 w-5" />
                Get in Touch
              </Button>
            </Link>
            <a href="tel:+201001234567">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Phone className="h-5 w-5" />
                Call Us Now
              </Button>
            </a>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
              <Phone className="h-8 w-8 text-primary-foreground mb-3" />
              <p className="font-medium text-primary-foreground">Call Us</p>
              <a href="tel:+201001234567" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                +20 1200558476
              </a>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
              <Mail className="h-8 w-8 text-primary-foreground mb-3" />
              <p className="font-medium text-primary-foreground">Email Us</p>
              <a href="mailto:info@alamalrealestate.com" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                info@casanovarealestate.com
              </a>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
              <MessageCircle className="h-8 w-8 text-primary-foreground mb-3" />
              <p className="font-medium text-primary-foreground">WhatsApp</p>
              <a href="https://wa.me/201200558476" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Send Message
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
