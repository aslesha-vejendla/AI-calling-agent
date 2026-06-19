import random


def generate_questions():

    technical_questions = [
        "Explain a project where you used Python.",
        "What is a SQL JOIN?",
        "What is Pandas used for?",
        "What is normalization in databases?",
        "What is the difference between list and tuple?"
    ]

    behavioral_questions = [
        "Tell me about yourself.",
        "What are your strengths?",
        "How do you handle pressure?",
        "Why should we hire you?"
    ]

    selected = []

    selected.extend(
        random.sample(technical_questions, 3)
    )

    selected.extend(
        random.sample(behavioral_questions, 2)
    )

    random.shuffle(selected)

    return selected