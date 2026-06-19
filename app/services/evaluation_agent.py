# app/services/evaluation_agent.py

class EvaluationAgent:

    def evaluate(self, answers):

        score = 0

        skill_keywords = [
            "python",
            "sql",
            "machine learning",
            "power bi",
            "excel",
            "data analysis",
            "dashboard",
            "pandas",
            "numpy"
        ]

        positive_keywords = [
            "project",
            "projects",
            "experience",
            "internship",
            "certification",
            "analysis",
            "development",
            "automation"
        ]

        matched_skills = []
        strengths = []

        for answer in answers:

            answer = answer.lower()

            for skill in skill_keywords:

                if skill in answer:

                    score += 10

                    if skill not in matched_skills:
                        matched_skills.append(skill)

            for keyword in positive_keywords:

                if keyword in answer:

                    score += 5

                    if keyword not in strengths:
                        strengths.append(keyword)

        if score >= 70:

            decision = "PASS"
            rating = "Excellent"

        elif score >= 40:

            decision = "PASS"
            rating = "Average"

        else:

            decision = "FAIL"
            rating = "Needs Improvement"

        return {
            "score": score,
            "decision": decision,
            "rating": rating,
            "matched_skills": matched_skills,
            "strengths": strengths
        }