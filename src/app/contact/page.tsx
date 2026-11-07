import { ExternalLink, Mail, MessageCircle, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact"
};

export default function contact() {
    return (
        <main className="mx-auto flex w-full flex-1 flex-col justify-center py-16">
            <section className="mb-10 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    <MessageCircle className="size-3.5" />
                    Get in touch
                </div>

                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                    Let's <span className="text-primary">Connect.</span>
                </h1>

                <p className="text-muted-foreground leading-relaxed">
                    Have a question, feedback, or an interesting opportunity?
                    Feel free to reach out. I'd be happy to hear from you.
                </p>
            </section>

            <div className="grid gap-4 sm:grid-cols-2">
                {/* Email */}
                <a
                    href="mailto:anuragpaul40@gmail.com"
                    className="group flex items-center gap-4 rounded-xl border bg-card p-5 transition-colors hover:bg-muted/50"
                >
                    <div className="rounded-lg bg-primary/10 p-3">
                        <Mail className="size-5 text-primary" />
                    </div>

                    <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Email me</p>
                        <p className="truncate font-medium">
                            anuragpaul40@gmail.com
                        </p>
                    </div>

                    <ExternalLink className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                {/* Mobile */}
                <a
                    href="tel:+918282869404"
                    className="group flex items-center gap-4 rounded-xl border bg-card p-5 transition-colors hover:bg-muted/50"
                >
                    <div className="rounded-lg bg-primary/10 p-3">
                        <Phone className="size-5 text-primary" />
                    </div>

                    <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Call or WhatsApp me</p>
                        <p className="truncate font-medium">
                            +91 82828 69404
                        </p>
                    </div>

                    <ExternalLink className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
                Usually happy to connect and discuss ideas, projects, and collaborations.
            </p>
        </main>
    );
}
