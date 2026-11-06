
from pathlib import Path

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings

from supabase import create_client

from app.core.config import settings


BASE_DIR = Path(__file__).resolve().parents[2]
PDF_PATH = BASE_DIR / "data" / "Product List.pdf"

BATCH_SIZE = 50


def ingest_pdf():

    if not PDF_PATH.exists():
        raise FileNotFoundError(f"PDF not found: {PDF_PATH}")

    # 1. Load PDF
    loader = PyPDFLoader(str(PDF_PATH))
    documents = loader.load()

    if not documents:
        raise ValueError("No content extracted from PDF")

    # 2. Split PDF into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.CHUNK_SIZE,
        chunk_overlap=settings.CHUNK_OVERLAP,
    )

    chunks = text_splitter.split_documents(documents)

    if not chunks:
        raise ValueError("No text chunks generated")

    for chunk in chunks:
        chunk.metadata["source"] = PDF_PATH.name

    # 3. Generate embeddings
    embedding_model = OpenAIEmbeddings(
        model=settings.EMBEDDING_MODEL,
        api_key=settings.OPENAI_API_KEY,
    )

    texts = [chunk.page_content for chunk in chunks]

    embeddings = embedding_model.embed_documents(texts)

    # 4. Connect to Supabase
    supabase = create_client(
        settings.SUPABASE_URL,
        settings.SUPABASE_SERVICE_ROLE_KEY,
    )

    # 5. Delete previously indexed chunks from this PDF
    supabase.table("document_chunks") \
        .delete() \
        .filter("metadata->>source", "eq", PDF_PATH.name) \
        .execute()

    # 6. Prepare database records
    rows = []

    for index, chunk in enumerate(chunks):
        rows.append({
            "chunk_index": index,
            "content": chunk.page_content,
            "embedding": embeddings[index],
            "metadata": chunk.metadata,
        })

    # 7. Insert records in batches
    for start in range(0, len(rows), BATCH_SIZE):
        batch = rows[start:start + BATCH_SIZE]

        supabase.table("document_chunks") \
            .insert(batch) \
            .execute()

    print("PDF ingestion completed successfully!")
    print(f"Pages processed: {len(documents)}")
    print(f"Chunks generated: {len(chunks)}")
    print(f"Embeddings generated: {len(embeddings)}")
    print(f"Records inserted: {len(rows)}")

    return rows


if __name__ == "__main__":
    ingest_pdf()
