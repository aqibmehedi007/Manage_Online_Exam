import json
import os

# Professional Question Bank for various roles
QUESTION_BANK = {
    "Frontend": [
        {"title": "What does the 'key' prop in React do?", "type": "RADIO", "options": [
            {"text": "Helps React identify which items have changed", "isCorrect": True},
            {"text": "Sets the CSS ID of the element", "isCorrect": False},
            {"text": "Is used for data binding", "isCorrect": False}
        ]},
        {"title": "Which hook would you use to perform a side effect in a functional component?", "type": "RADIO", "options": [
            {"text": "useEffect", "isCorrect": True},
            {"text": "useState", "isCorrect": False},
            {"text": "useContext", "isCorrect": False}
        ]},
        {"title": "Explain the Virtual DOM and its benefits.", "type": "TEXT", "options": []},
        {"title": "Which of these are CSS preprocessors?", "type": "CHECKBOX", "options": [
            {"text": "Sass", "isCorrect": True},
            {"text": "Less", "isCorrect": True},
            {"text": "Redux", "isCorrect": False},
            {"text": "Stylus", "isCorrect": True}
        ]}
    ],
    "Backend": [
        {"title": "What is the purpose of middleware in Express.js?", "type": "RADIO", "options": [
            {"text": "To handle logic between request and response", "isCorrect": True},
            {"text": "To manage the frontend state", "isCorrect": False},
            {"text": "To connect to the database directly", "isCorrect": False}
        ]},
        {"title": "Explain the difference between SQL and NoSQL databases.", "type": "TEXT", "options": []},
        {"title": "Which of these are characteristic of microservices?", "type": "CHECKBOX", "options": [
            {"text": "Independent deployment", "isCorrect": True},
            {"text": "Single database shared by all services", "isCorrect": False},
            {"text": "Scalability per service", "isCorrect": True},
            {"text": "Loosely coupled", "isCorrect": True}
        ]}
    ],
    "Data Scientist": [
        {"title": "What is overfitting in Machine Learning?", "type": "TEXT", "options": []},
        {"title": "Which algorithm is commonly used for classification tasks?", "type": "RADIO", "options": [
            {"text": "K-Means Clustering", "isCorrect": False},
            {"text": "Logistic Regression", "isCorrect": True},
            {"text": "Linear Regression", "isCorrect": False}
        ]},
        {"title": "Which of these are libraries for data manipulation in Python?", "type": "CHECKBOX", "options": [
            {"text": "Pandas", "isCorrect": True},
            {"text": "NumPy", "isCorrect": True},
            {"text": "Django", "isCorrect": False},
            {"text": "Matplotlib", "isCorrect": True}
        ]}
    ],
    "HR": [
        {"title": "What are the key components of a professional performance review?", "type": "TEXT", "options": []},
        {"title": "Explain 'unconscious bias' in recruitment.", "type": "TEXT", "options": []},
        {"title": "Which of these are effective ways to improve employee retention?", "type": "CHECKBOX", "options": [
            {"text": "Competitive salary", "isCorrect": True},
            {"text": "Poor communication", "isCorrect": False},
            {"text": "Career growth opportunities", "isCorrect": True},
            {"text": "Flexible working hours", "isCorrect": True}
        ]}
    ],
    "Cybersecurity": [
        {"title": "What is a SQL Injection attack?", "type": "TEXT", "options": []},
        {"title": "What is the difference between Symmetric and Asymmetric encryption?", "type": "RADIO", "options": [
            {"text": "Symmetric uses one key, Asymmetric uses two", "isCorrect": True},
            {"text": "Asymmetric is faster than Symmetric", "isCorrect": False},
            {"text": "Symmetric is purely for web traffic", "isCorrect": False}
        ]},
        {"title": "Which of these are common security protocols?", "type": "CHECKBOX", "options": [
            {"text": "HTTPS", "isCorrect": True},
            {"text": "SSH", "isCorrect": True},
            {"text": "Telnet", "isCorrect": False},
            {"text": "TLS", "isCorrect": True}
        ]}
    ],
    "Marketing": [
        {"title": "What is the primary purpose of a 'Call to Action' (CTA)?", "type": "RADIO", "options": [
            {"text": "To encourage the user to take a specific action", "isCorrect": True},
            {"text": "To explain the company history", "isCorrect": False},
            {"text": "To display the brand logo", "isCorrect": False}
        ]},
        {"title": "Explain the concept of 'Conversion Rate Optimization' (CRO).", "type": "TEXT", "options": []},
        {"title": "Which platforms are effective for B2B digital marketing?", "type": "CHECKBOX", "options": [
            {"text": "LinkedIn", "isCorrect": True},
            {"text": "TikTok", "isCorrect": False},
            {"text": "Google Search Ads", "isCorrect": True},
            {"text": "Email Marketing", "isCorrect": True}
        ]}
    ],
    "Finance": [
        {"title": "What is the 'Quick Ratio' in accounting?", "type": "TEXT", "options": []},
        {"title": "Which document is essential for tracking a company's liquidity?", "type": "RADIO", "options": [
            {"text": "Balance Sheet", "isCorrect": False},
            {"text": "Cash Flow Statement", "isCorrect": True},
            {"text": "Income Statement", "isCorrect": False}
        ]},
        {"title": "State the basic accounting equation.", "type": "RADIO", "options": [
            {"text": "Assets = Liabilities + Equity", "isCorrect": True},
            {"text": "Income = Revenue - Expenses", "isCorrect": False},
            {"text": "Assets = Liabilities - Equity", "isCorrect": False}
        ]}
    ],
    "Project Manager": [
        {"title": "Describe the core principles of the Agile manifesto.", "type": "TEXT", "options": []},
        {"title": "What is the 'Critical Path' in project management?", "type": "RADIO", "options": [
            {"text": "The longest sequence of dependent tasks", "isCorrect": True},
            {"text": "The shortest path to project completion", "isCorrect": False},
            {"text": "The list of all low-priority tasks", "isCorrect": False}
        ]},
        {"title": "Which of these are Agile methodologies?", "type": "CHECKBOX", "options": [
            {"text": "Scrum", "isCorrect": True},
            {"text": "Kanban", "isCorrect": True},
            {"text": "Waterfall", "isCorrect": False},
            {"text": "Lean", "isCorrect": True}
        ]}
    ],
    "DevOps": [
        {"title": "What does CI/CD stand for?", "type": "RADIO", "options": [
            {"text": "Continuous Integration / Continuous Deployment", "isCorrect": True},
            {"text": "Cloud Integration / Computing Device", "isCorrect": False},
            {"text": "Code Inspection / Constant Debugging", "isCorrect": False}
        ]},
        {"title": "Explain Infrastructure as Code (IaC).", "type": "TEXT", "options": []},
        {"title": "Which of these are common DevOps tools?", "type": "CHECKBOX", "options": [
            {"text": "Jenkins", "isCorrect": True},
            {"text": "Terraform", "isCorrect": True},
            {"text": "Photoshop", "isCorrect": False},
            {"text": "Docker", "isCorrect": True}
        ]}
    ],
    "Content": [
        {"title": "Define 'Brand Voice' and why it matters.", "type": "TEXT", "options": []},
        {"title": "What is the primary goal of Content Marketing?", "type": "RADIO", "options": [
            {"text": "To provide valuable content to attract and retain an audience", "isCorrect": True},
            {"text": "To sell products directly without information", "isCorrect": False},
            {"text": "To fill up empty space on a website", "isCorrect": False}
        ]},
        {"title": "Which of these are metrics for evaluating content performance?", "type": "CHECKBOX", "options": [
            {"text": "Page views", "isCorrect": True},
            {"text": "Bounce rate", "isCorrect": True},
            {"text": "Number of social shares", "isCorrect": True},
            {"text": "Hard drive space used", "isCorrect": False}
        ]}
    ]
}

def map_title_to_key(title):
    title = title.lower()
    if "frontend" in title: return "Frontend"
    if "backend" in title: return "Backend"
    if "data scientist" in title: return "Data Scientist"
    if "hr manager" in title: return "HR"
    if "cybersecurity" in title: return "Cybersecurity"
    if "digital marketing" in title: return "Marketing"
    if "financial" in title: return "Finance"
    if "project manager" in title: return "Project Manager"
    if "devops" in title: return "DevOps"
    if "content strategist" in title: return "Content"
    return "Marketing" # Default

def main():
    json_path = "public/data/exams.json"
    with open(json_path, "r") as f:
        exams = json.load(f)
    
    for exam in exams:
        key = map_title_to_key(exam['title'])
        questions = QUESTION_BANK.get(key, [])
        
        # Multiply questions to reach ~15-20 per exam
        extended_questions = []
        for i in range(5): # Repeat the small bank to fill up
            for q in questions:
                # Add some variety to titles if repeated
                new_q = q.copy()
                if i > 0:
                    new_q['title'] = f"[{i+1}] {new_q['title']}"
                extended_questions.append(new_q)
        
        exam['questions'] = extended_questions[:20] # Take exactly 20
        
    with open(json_path, "w") as f:
        json.dump(exams, f, indent=2)
    
    print(f"Successfully updated {len(exams)} exams in {json_path}")

if __name__ == "__main__":
    main()
