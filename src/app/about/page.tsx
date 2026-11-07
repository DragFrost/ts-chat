import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowRight, BrainCircuit, Code2, Component, Database, FileText, Gauge, Layers, Lightbulb, Palette, Sparkles, Workflow } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About"
};

export default function about() {
    return (
        <main className="mx-auto w-full py-12 md:py-20">
            {/* Hero */}
            <section className="mb-16 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    <Sparkles className="size-3.5" />
                    About the project
                </div>

                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                    Meet <span className="text-primary">Ts Chat.</span>
                </h1>

                <p className="text-lg leading-relaxed text-muted-foreground">
                    A modern AI-powered conversational application built to explore the
                    intersection of full-stack development, large language models, and
                    intelligent information retrieval.
                </p>
            </section>

            {/* Overview */}
            <section className="mb-16 space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                    What is Ts Chat?
                </h2>

                <div className="space-y-4 leading-7 text-muted-foreground">
                    <p>
                        Ts Chat is a full-stack AI chatbot application developed using
                        Next.js and the Vercel AI SDK. It brings together modern web
                        technologies and AI capabilities to create a smooth, responsive,
                        and intelligent conversational experience.
                    </p>

                    <p>
                        Powered by OpenAI's language models, the application goes beyond
                        basic text generation by incorporating a document retrieval
                        system. It uses Supabase PostgreSQL hybrid search, combining
                        semantic search with traditional full-text search to retrieve
                        relevant information and provide context-aware responses.
                    </p>

                    <p>
                        The application also incorporates Redis-based rate limiting to
                        control request frequency and help protect API resources, while
                        Tailwind CSS and shadcn/ui provide a clean, accessible, and
                        responsive user interface.
                    </p>

                    <p>
                        The goal is to build a practical AI application while exploring
                        how language models, database search, streaming, and modern
                        frontend technologies work together in a real-world environment.
                    </p>
                </div>
            </section>

            {/* Document Ingestion & RAG Pipeline */}
            <section className="mb-16 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Document Ingestion & RAG Pipeline
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Turning raw documents into searchable knowledge.
                    </p>
                </div>

                <div className="space-y-4 leading-7 text-muted-foreground">
                    <p>
                        The application uses a separate Python-based ingestion pipeline
                        built with LangChain to process PDF documents and prepare their
                        contents for retrieval.
                    </p>

                    <p>
                        During ingestion, the PDF content is extracted and divided into
                        smaller, manageable chunks. These chunks are converted into
                        numerical vector representations (embeddings), allowing the
                        application to retrieve information based on semantic meaning
                        rather than relying solely on exact keyword matches.
                    </p>

                    <p>
                        The processed chunks, along with their embeddings and associated
                        metadata, are stored in Supabase PostgreSQL. This makes the
                        document content available for subsequent retrieval during
                        conversations.
                    </p>

                    <p>
                        When a user submits a question, the retrieval layer searches
                        the stored document content using hybrid search, combining
                        semantic similarity with PostgreSQL Full-Text Search. The
                        retrieved information is then used as contextual input for
                        OpenAI to generate a more relevant and grounded response.
                    </p>
                </div>

                {/* Ingestion flow */}
                <div className="rounded-xl border bg-card p-5 md:p-6">
                    <div className="mb-5 flex items-center gap-2">
                        <FileText className="size-5 text-primary" />
                        <h3 className="font-semibold">Document Processing Workflow</h3>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        {[
                            {
                                title: "PDF Document",
                                subtitle: "Source document",
                                icon: FileText,
                            },
                            {
                                title: "Python + LangChain",
                                subtitle: "Document loading and text extraction",
                                icon: Code2,
                            },
                            {
                                title: "Text Chunking",
                                subtitle: "Splitting content into smaller chunks",
                                icon: Layers,
                            },
                            {
                                title: "Embedding Generation",
                                subtitle: "Converting text into vector representations",
                                icon: BrainCircuit,
                            },
                            {
                                title: "Supabase PostgreSQL",
                                subtitle: "Storing chunks, embeddings, and metadata",
                                icon: Database,
                            },
                        ].map((step, index, array) => {
                            const Icon = step.icon;

                            return (
                                <div key={step.title} className="w-full max-w-md">
                                    <div className="flex items-center gap-4 rounded-lg border bg-background p-4">
                                        <div className="rounded-lg bg-primary/10 p-2.5">
                                            <Icon className="size-5 text-primary" />
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-foreground">
                                                {step.title}
                                            </h4>
                                            <p className="text-xs text-muted-foreground">
                                                {step.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    {index !== array.length - 1 && (
                                        <ArrowDown className="mx-auto my-1 size-4 text-muted-foreground" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section className="mb-16 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Technology Stack
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        The technologies behind the application.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {[
                        {
                            name: "Next.js",
                            category: "Application Framework",
                            description:
                                "Powers the application architecture, frontend, and server-side functionality.",
                            icon: Code2,
                        },
                        {
                            name: "Vercel AI SDK",
                            category: "AI Integration",
                            description:
                                "Manages AI interactions, chat messages, and streaming responses.",
                            icon: Workflow,
                        },
                        {
                            name: "OpenAI API",
                            category: "Language Model",
                            description:
                                "Provides natural language understanding and intelligent response generation.",
                            icon: BrainCircuit,
                        },
                        {
                            name: "Supabase PostgreSQL",
                            category: "Database & Search",
                            description:
                                "Combines semantic vector search and PostgreSQL full-text search for hybrid retrieval.",
                            icon: Database,
                        },
                        {
                            name: "Redis",
                            category: "Rate Limiting",
                            description:
                                "Controls request frequency and helps prevent excessive API usage.",
                            icon: Gauge,
                        },
                        {
                            name: "Tailwind CSS",
                            category: "Styling",
                            description:
                                "Provides a utility-first approach to building responsive interfaces.",
                            icon: Palette,
                        },
                        {
                            name: "shadcn/ui",
                            category: "UI Components",
                            description:
                                "Provides reusable, customizable, and accessible interface components.",
                            icon: Component,
                        },
                        {
                            name: "Python",
                            category: "Document Processing",
                            description:
                                "Powers the document ingestion pipeline, handling PDF processing and preparation of content for retrieval.",
                            icon: Code2,
                        },
                        {
                            name: "LangChain",
                            category: "RAG Framework",
                            description:
                                "Handles document loading, text splitting, chunking, and embedding workflows for retrieval-augmented generation.",
                            icon: Workflow,
                        },
                        {
                            name: "Embeddings",
                            category: "Semantic Representation",
                            description:
                                "Transforms document chunks into numerical vector representations for semantic similarity search.",
                            icon: BrainCircuit,
                        },
                    ].map((tech) => {
                        const Icon = tech.icon;

                        return (
                            <div
                                key={tech.name}
                                className="group rounded-xl border bg-card p-5 transition-colors hover:bg-muted/50"
                            >
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="rounded-lg border bg-background p-2.5">
                                        <Icon className="size-5 text-primary" />
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        {tech.category}
                                    </span>
                                </div>

                                <h3 className="mb-2 font-semibold">{tech.name}</h3>

                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {tech.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Architecture */}
            <section className="mb-16 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Application Architecture
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Two interconnected workflows power the application.
                    </p>
                </div>

                {/* Ingestion */}
                <div className="rounded-xl border bg-card p-5 md:p-6">
                    <h3 className="mb-5 font-semibold">01. Document Ingestion</h3>

                    <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                        {["PDF", "Python + LangChain", "Chunking", "Embeddings", "Supabase"].map(
                            (item, index) => (
                                <div className="flex" key={item}>
                                    <Badge variant="secondary">{item}</Badge>
                                    {index !== 4 && (
                                        <ArrowRight className="size-4 text-muted-foreground" />
                                    )}
                                </div>
                            )
                        )}
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                        Documents are processed, split into chunks, embedded, and stored
                        in PostgreSQL for future retrieval.
                    </p>
                </div>

                {/* Retrieval */}
                <div className="rounded-xl border bg-card p-5 md:p-6">
                    <h3 className="mb-5 font-semibold">02. Conversational Retrieval</h3>

                    <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                        {["User Query", "Next.js", "Hybrid Search", "OpenAI", "Streaming"].map(
                            (item, index) => (
                                <div className="flex" key={item}>
                                    <Badge variant="secondary">{item}</Badge>
                                    {index !== 4 && (
                                        <ArrowRight className="size-4 text-muted-foreground" />
                                    )}
                                </div>
                            )
                        )}
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                        User queries trigger document retrieval. Relevant context is
                        passed to the language model, which generates and streams
                        the response back to the chat interface.
                    </p>
                </div>
            </section>

            {/* Objective */}
            <section className="rounded-2xl border bg-muted/30 p-6 md:p-8">
                <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10">
                    <Lightbulb className="size-5 text-primary" />
                </div>

                <h2 className="mb-3 text-2xl font-semibold tracking-tight">
                    Built to Explore. Designed to Evolve.
                </h2>

                <p className="leading-7 text-muted-foreground">
                    Ts Chat is an ongoing exploration of modern AI application
                    development. From integrating large language models and building
                    hybrid retrieval systems to handling streaming responses and
                    implementing application-level safeguards, the project brings
                    together several important concepts in applied AI engineering.
                </p>

                <p className="mt-4 font-medium text-foreground">
                    Built with curiosity, modern technologies, and a passion for AI.
                </p>
            </section>
        </main>
    );
}
