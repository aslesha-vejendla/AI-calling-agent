class LeadGenerationAgent:

    def __init__(self):

        self.questions = [

            "What is your name?",

            "Which company do you work for?",

            "Are you interested in AI voice agents?",

            "Would you like a demo?",

            "What is your email address?"
        ]

    def get_questions(self):

        return self.questions

    def evaluate_interest(self, answers):

        score = 0

        for answer in answers:

            answer = str(answer).lower()

            if "yes" in answer:
                score += 20

            if "interested" in answer:
                score += 20

            if "demo" in answer:
                score += 20

        if score >= 40:
            return "HIGH"

        if score >= 20:
            return "MEDIUM"

        return "LOW"