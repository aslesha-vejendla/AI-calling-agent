from services.question_generator import generate_questions


class PreScreeningAgent:

    def __init__(self):
        self.questions = generate_questions()

    def get_questions(self):
        return self.questions

    def evaluate(self, answers):

        score = 0

        keywords = [
            "python",
            "sql",
            "power bi",
            "project",
            "experience",
            "data"
        ]

        for answer in answers:

            answer = str(answer).lower()

            for keyword in keywords:

                if keyword in answer:
                    score += 10

        if score >= 40:

            return {
                "status": "PASS",
                "score": score
            }

        return {
            "status": "FAIL",
            "score": score
        }