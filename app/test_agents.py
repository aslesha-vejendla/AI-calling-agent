from services.pre_screening_agent import PreScreeningAgent
from services.lead_generation_agent import LeadGenerationAgent
from services.calling_agent import CallingAgent
from services.resume_analysis_agent import ResumeAnalysisAgent
from services.evaluation_agent import EvaluationAgent


print("\n========== PRE SCREENING AGENT ==========\n")

pre_agent = PreScreeningAgent()

print("Questions:")
print(pre_agent.get_questions())

result = pre_agent.evaluate([
    "I know Python",
    "I have SQL experience",
    "I built data projects"
])

print("\nEvaluation:")
print(result)


print("\n========== LEAD GENERATION AGENT ==========\n")

lead_agent = LeadGenerationAgent()

print("Questions:")
print(lead_agent.get_questions())

interest = lead_agent.evaluate_interest([
    "yes",
    "I am interested",
    "I want a demo"
])

print("\nInterest Level:")
print(interest)


print("\n========== CALLING AGENT ==========\n")

call_agent = CallingAgent()

response = call_agent.generate_follow_up(
    "yes I am interested"
)

print("Follow Up:")
print(response)

print("\n========== RESUME ANALYSIS AGENT ==========\n")

resume_agent = ResumeAnalysisAgent()

resume_text = """
Python SQL Power BI Machine Learning
"""

analysis = resume_agent.analyze(resume_text)

print("Resume Analysis:")
print(analysis)


print("\n========== AI EVALUATION AGENT ==========\n")

evaluation_agent = EvaluationAgent()

answers = [
    "I know Python and SQL",
    "I built machine learning projects",
    "I created Power BI dashboards",
    "I have internship experience in data analysis"
]

result = evaluation_agent.evaluate(answers)

print("Evaluation Result:")
print(result)