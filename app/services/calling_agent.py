# app/services/calling_agent.py

class CallingAgent:

    def generate_follow_up(self, answer):

        answer = answer.lower()

        # Interest related
        if "yes" in answer:
            return "Great. Can you tell me more about your interest?"

        if "interested" in answer:
            return "That's good to hear. What interests you most about AI voice agents?"

        if "demo" in answer:
            return "Excellent. Would you like a live demonstration of the system?"

        # Technical skills
        if "python" in answer:
            return "How many years of experience do you have with Python?"

        if "sql" in answer:
            return "Can you describe a project where you used SQL?"

        if "power bi" in answer:
            return "Have you created dashboards using Power BI?"

        if "machine learning" in answer:
            return "What machine learning projects have you worked on?"

        if "data analysis" in answer:
            return "Can you explain your experience with data analysis?"

        # Experience related
        if "fresher" in answer:
            return "Are you currently working on any personal or academic projects?"

        if "experience" in answer:
            return "Can you briefly describe your previous experience?"

        # Contact information
        if "email" in answer:
            return "Thank you. We will use that email address for further communication."

        if "phone" in answer:
            return "Thank you. We will contact you on that number if required."

        # Negative responses
        if "no" in answer:
            return "Could you explain why?"

        if "not interested" in answer:
            return "Thank you for your honesty. Is there any specific reason for your lack of interest?"

        # Default response
        return "Can you elaborate further on that?"