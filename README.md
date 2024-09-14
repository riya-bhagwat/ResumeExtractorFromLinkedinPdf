# LinkedIn PDF to HTML Resume Generator

## Objective
This web application takes a PDF resume downloaded from LinkedIn and converts it into an HTML resume using OpenAI's API for intelligent text extraction and formatting.

## Features
- Upload a LinkedIn PDF.
- Use OpenAI API to extract and structure resume details.
- Generates an HTML resume from the extracted data.

## How to Use
1. Upload your LinkedIn PDF resume.
2. Enter your OpenAI API key.
3. Click "Generate Resume."
4. View or copy the generated HTML.

## Deployment
The app is deployed on Vercel. You can access it [here](https://resume-extractor-from-linkedin-pdf.vercel.app/).

## Approach
1. **PDF Parsing**: Used `pdf-parse` to extract text from the PDF.
2. **AI Processing**: The text is sent to OpenAI API, where it's converted into structured HTML.
3. **Frontend/Backend**: Simple Express server handles the API requests and responses.
4. **Deployment**: Hosted on Vercel for easy accessibility.
