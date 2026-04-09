import json
import random
import os

# Configuration
USER_COUNT = 50
EMAILS = ["akij.work", "dhakabank.com.bd", "gmail.com", "outlook.com", "yahoo.com"]

# Gender-specific names
MALE_FIRST_NAMES = [
    "Arif", "Sajid", "Nabil", "Kamal", "Zahid", "Rumman", "Tanvir", "Fahim", "Shafiq", "Mehedi",
    "Rahat", "Sabbir", "Mithu", "Hasan", "Rakib", "Taufiq", "Salim", "Tushar", "Imran", "Shohag",
    "Jashim", "Bakul", "Abir", "Sadat", "Emon", "Tarek", "Sabbir", "Moin", "Rifat", "Aditya"
]

FEMALE_FIRST_NAMES = [
    "Anika", "Tanjila", "Nusrat", "Sumi", "Farhana", "Sadia", "Mim", "Riya", "Aparna", "Ishrat",
    "Tahmina", "Jebin", "Mou", "Priya", "Tasneem", "Sanjida", "Rani", "Maya", "Purnima", "Rimi"
]

LAST_NAMES = [
    "Hossain", "Ahmed", "Islam", "Rahman", "Khan", "Uddin", "Chowdhury", "Patwary", "Siddique", "Miah",
    "Ali", "Haque", "Talukder", "Bhuiyan", "Mahmud", "Sharif", "Munshi", "Dewan", "Sarkar", "Biswas"
]

def generate_users():
    users = []
    # Add an employer
    users.append({
        "name": "Employer At Akij",
        "email": "employer@akij.work",
        "password": "password123",
        "role": "EMPLOYER",
        "gender": "MALE",
        "image": None
    })

    # Generate male candidates
    for i in range(USER_COUNT // 2):
        f = random.choice(MALE_FIRST_NAMES)
        l = random.choice(LAST_NAMES)
        name = f"{f} {l}"
        email = f"{f.lower()}.{l.lower()}.{random.randint(10,999)}@{random.choice(EMAILS)}"
        users.append({
            "name": name,
            "email": email,
            "password": "password123",
            "role": "CANDIDATE",
            "gender": "MALE",
            "image": f"https://i.pravatar.cc/150?u={email}"
        })
    
    # Generate female candidates
    for i in range(USER_COUNT // 2):
        f = random.choice(FEMALE_FIRST_NAMES)
        l = random.choice(LAST_NAMES)
        name = f"{f} {l}"
        email = f"{f.lower()}.{l.lower()}.{random.randint(10,999)}@{random.choice(EMAILS)}"
        users.append({
            "name": name,
            "email": email,
            "password": "password123",
            "role": "CANDIDATE",
            "gender": "FEMALE",
            "image": f"https://i.pravatar.cc/150?u={email}"
        })
        
    return users

def generate_exams():
    exams = [
        {
            "title": "Senior Frontend Engineer (React/TypeScript)",
            "totalCandidates": 100, "totalSlots": 5, "questionSets": 20, "questionType": "BOTH",
            "startTime": "2026-05-10T10:00", "endTime": "2026-05-10T11:30", "duration": 90, "negativeMarking": 0.25,
            "questions": [
                {"title": "What is the difference between useMemo and useCallback?", "type": "RADIO", "options": [
                    {"text": "useMemo memoizes values, useCallback memoizes functions", "isCorrect": True},
                    {"text": "useMemo is for components, useCallback is for hooks", "isCorrect": False},
                    {"text": "They are exactly same", "isCorrect": False}
                ]},
                {"title": "Explain React Server Components.", "type": "TEXT", "options": []}
            ]
        },
        {
            "title": "Backend Architect (Node.js/Microservices)",
            "totalCandidates": 50, "totalSlots": 2, "questionSets": 15, "questionType": "RADIO",
            "startTime": "2026-05-12T14:00", "endTime": "2026-05-12T15:30", "duration": 90, "negativeMarking": 0.5,
            "questions": [
                {"title": "Which protocol is used for gRPC?", "type": "RADIO", "options": [
                    {"text": "HTTP/1.1", "isCorrect": False},
                    {"text": "HTTP/2", "isCorrect": True},
                    {"text": "WebSockets", "isCorrect": False}
                ]}
            ]
        },
        {
            "title": "Data Scientist - Machine Learning",
            "totalCandidates": 80, "totalSlots": 3, "questionSets": 10, "questionType": "CHECKBOX",
            "startTime": "2026-06-01T09:00", "endTime": "2026-06-01T11:00", "duration": 120, "negativeMarking": 0.25,
            "questions": [
                {"title": "Which of these are ensemble methods?", "type": "CHECKBOX", "options": [
                    {"text": "Random Forest", "isCorrect": True},
                    {"text": "XGBoost", "isCorrect": True},
                    {"text": "Linear Regression", "isCorrect": False}
                ]}
            ]
        },
        {
            "title": "HR Manager - Strategic Recruitment",
            "totalCandidates": 30, "totalSlots": 1, "questionSets": 25, "questionType": "TEXT",
            "startTime": "2026-04-25T11:00", "endTime": "2026-04-25T12:00", "duration": 60, "negativeMarking": 0.0,
            "questions": [
                {"title": "How do you handle conflict resolution between two team leads?", "type": "TEXT", "options": []}
            ]
        },
        {
            "title": "Cybersecurity Lead (SOC/Pentesting)",
            "totalCandidates": 40, "totalSlots": 2, "questionSets": 12, "questionType": "RADIO",
            "startTime": "2026-07-20T15:00", "endTime": "2026-07-20T17:00", "duration": 120, "negativeMarking": 1.0,
            "questions": [
                {"title": "What does a 403 Forbidden error mean?", "type": "RADIO", "options": [
                    {"text": "Resource not found", "isCorrect": False},
                    {"text": "Authentication successful but access denied", "isCorrect": True},
                    {"text": "Server error", "isCorrect": False}
                ]}
            ]
        },
        {
            "title": "Digital Marketing Executive",
            "totalCandidates": 120, "totalSlots": 10, "questionSets": 30, "questionType": "RADIO",
            "startTime": "2026-05-15T16:00", "endTime": "2026-05-15T17:00", "duration": 60, "negativeMarking": 0.25,
            "questions": [
                {"title": "What is the primary goal of SEO?", "type": "RADIO", "options": [
                    {"text": "Increasing organic search visibility", "isCorrect": True},
                    {"text": "Running paid ads", "isCorrect": False},
                    {"text": "Designing logos", "isCorrect": False}
                ]}
            ]
        },
        {
            "title": "Financial Controller - GAAP/IFRS",
            "totalCandidates": 20, "totalSlots": 1, "questionSets": 15, "questionType": "RADIO",
            "startTime": "2026-05-30T10:00", "endTime": "2026-05-30T12:00", "duration": 120, "negativeMarking": 0.5,
            "questions": [
                {"title": "Which statement shows a company's financial position at a point in time?", "type": "RADIO", "options": [
                    {"text": "Income Statement", "isCorrect": False},
                    {"text": "Balance Sheet", "isCorrect": True},
                    {"text": "Cash Flow Statement", "isCorrect": False}
                ]}
            ]
        },
        {
            "title": "Project Manager - Agile Practitioner",
            "totalCandidates": 60, "totalSlots": 4, "questionSets": 18, "questionType": "BOTH",
            "startTime": "2026-06-12T14:30", "endTime": "2026-06-12T16:00", "duration": 90, "negativeMarking": 0.25,
            "questions": [
                {"title": "What is a characteristic of a Scrum Master?", "type": "RADIO", "options": [
                    {"text": "Direct manager of developers", "isCorrect": False},
                    {"text": "Servant leader", "isCorrect": True},
                    {"text": "Final decision maker for product vision", "isCorrect": False}
                ]}
            ]
        },
        {
            "title": "DevOps Engineer (Cloud Native)",
            "totalCandidates": 45, "totalSlots": 2, "questionSets": 14, "questionType": "CHECKBOX",
            "startTime": "2026-05-05T09:00", "endTime": "2026-05-05T11:00", "duration": 120, "negativeMarking": 0.5,
            "questions": [
                {"title": "Which of these are container orchestration tools?", "type": "CHECKBOX", "options": [
                    {"text": "Kubernetes", "isCorrect": True},
                    {"text": "Docker Swarm", "isCorrect": True},
                    {"text": "VirtualBox", "isCorrect": False}
                ]}
            ]
        },
        {
            "title": "Content Strategist & Copywriter",
            "totalCandidates": 90, "totalSlots": 5, "questionSets": 20, "questionType": "TEXT",
            "startTime": "2026-04-20T10:00", "endTime": "2026-04-20T11:00", "duration": 60, "negativeMarking": 0.0,
            "questions": [
                {"title": "Write a compelling headline for a new organic coffee brand.", "type": "TEXT", "options": []}
            ]
        }
    ]
    return exams

if __name__ == "__main__":
    os.makedirs("public/data", exist_ok=True)
    
    users = generate_users()
    exams = generate_exams()
    
    with open("public/data/users.json", "w") as f:
        json.dump(users, f, indent=2)
        
    with open("public/data/exams.json", "w") as f:
        json.dump(exams, f, indent=2)
        
    print(f"Generated {len(users)} users (Gender-matched) and {len(exams)} exams.")
