import re
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer

def preprocess_query(query):
    query = query.lower()
    query = re.sub(r'[^a-zA-Z\s]', '', query)
    return query

def preprocess_text(text, porter_stemmer):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    tokens = word_tokenize(text.lower())
    stemmed_tokens = [porter_stemmer.stem(token) for token in tokens if token.isalnum()]
    stemmed_text = ' '.join(stemmed_tokens)
    return stemmed_text
