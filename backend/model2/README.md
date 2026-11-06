
# Model 2: Educational Comic Generation

## Description

Converts Python and Java source code into educational
movie-themed comic stories and illustrated comic PDFs.

## Components

1. Python AST and Java pattern-based concept extraction.
2. Movie-character knowledge retrieval using JSON.
3. Rule-based educational story generation.
4. Four-panel comic expansion.
5. AI image generation using AI Horde.
6. PDF assembly using ReportLab.

## Dataset

dataset/comic_movie_dataset.json

## Generated Assets

generated_images/

output/

## Requirements

Install dependencies:

pip install -r requirements.txt

## Important Limitations

- Story generation uses templates and dataset retrieval.
- No generative language model has been fine-tuned.
- Images are generated using a hosted pretrained image service.
- Character consistency is not guaranteed.
- Java concept extraction uses regular expressions.
- Public deployment requires suitable API configuration,
  request limits and error handling.
