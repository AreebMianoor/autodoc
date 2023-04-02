import os
import requests
import openai
from bs4 import BeautifulSoup
from dotenv import load_dotenv

# Load OpenAI API key from environment variable
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Define function to get contents of a file on GitHub
def get_file_contents(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        raise Exception(f"Failed to fetch file content from {url}")

# Define function to get list of files in a GitHub repository
def get_repo_files(repo_url):
    response = requests.get(repo_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        file_urls = []
        for link in soup.find_all('a'):
            href = link.get('href')
            if href.endswith(('.py', '.ipynb', '.r', '.java', '.cpp', '.c', '.h', '.cxx', '.hpp', '.js')):
                file_urls.append(repo_url + '/' + href)
        return file_urls
    else:
        raise Exception(f"Failed to fetch repository content from {repo_url}")

# Define function to generate README for a GitHub repository using OpenAI GPT-3
def generate_readme(repo_url):
    prompt = (
        f"Please provide a detailed README.md file for a project hosted at {repo_url}.\n\n"
        "The README should include the following sections:\n\n"
        "- Description\n"
        "- Goals\n"
        "- Business Problem\n"
        "- Solution\n"
        "- Metrics\n"
        "- Example\n"
        "- Installation and Usage\n"
        "  - Prerequisites\n"
        "  - Step-by-Step Installation Guide\n"
        "  - Usage Instructions and Best Practices\n"
        "- Key Stakeholders\n"
    )
    
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )

    return response.choices[0].text.strip()

# Define function to save generated README to disk
def save_readme(readme, repo_name):
    with open(f'{repo_name}_README.md', 'w') as f:
        f.write(readme)
    print(f'Readme saved to {repo_name}_README.md')

# Example usage
repo_url = 'https://github.com/tahakhawaja/software-industry-competitor'
readme = generate_readme(repo_url)
repo_name = repo_url.split('/')[-1]
save_readme(readme, repo_name)
