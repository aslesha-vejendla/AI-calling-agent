# app/services/resume_analysis_agent.py

class ResumeAnalysisAgent:

    def analyze(self, resume_text):

        skills = []

        skill_list = [
            "python",
            "sql",
            "power bi",
            "machine learning",
            "excel"
        ]

        for skill in skill_list:
            if skill in resume_text.lower():
                skills.append(skill)

        return {
            "skills": skills,
            "experience": "Fresher",
            "recommendation": "PASS"
        }