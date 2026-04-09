import json
import random
import uuid

# Configuration
USER_COUNT = 40
EXAM_COUNT = 5

FIRST_NAMES = [
    "Arif", "Sajid", "Nabil", "Kamal", "Zahid", "Rumman", "Tanvir", "Fahim", "Shafiq", "Mehedi",
    "Anika", "Tanjila", "Nusrat", "Sumi", "Farhana", "Sadia", "Mim", "Riya", "Aparna", "Ishrat",
    "Rahat", "Sabbir", "Mithu", "Hasan", "Rakib", "Taufiq", "Salim", "Tushar", "Imran", "Shohag"
]

LAST_NAMES = [
    "Hossain", "Ahmed", "Islam", "Rahman", "Khan", "Uddin", "Chowdhury", "Patwary", "Siddique", "Miah",
    "Ali", "Haque", "Talukder", "Bhuiyan", "Mahmud", "Sharif", "Munshi", "Dewan", "Sarkar", "Biswas"
]

EMAILS = ["akij.work", "dhakabank.com.bd", "gmail.com", "outlook.com"]

DEPARTMENTS = ["Finance", "IT", "HR", "Sales", "Operations", "Procurement"]

def generate_users():
    users = []
    # Add a main candidate for testing
    users.append({
        "name": "Candidate At Akij",
        "email": "candidate@akij.work",
        "password": "password123",
        "role": "CANDIDATE",
        "image": None
    })
    
    # Add an employer
    users.append({
        "name": "Employer At Akij",
        "email": "employer@akij.work",
        "password": "password123",
        "role": "EMPLOYER",
        "image": None
    })

    for i in range(USER_COUNT):
        f = random.choice(FIRST_NAMES)
        l = random.choice(LAST_NAMES)
        name = f"{f} {l}"
        email = f"{f.lower()}.{l.lower()}.{random.randint(10,999)}@{random.choice(EMAILS)}"
        users.append({
            "name": name,
            "email": email,
            "password": "password123",
            "role": "CANDIDATE",
            "image": f"https://i.pravatar.cc/150?u={email}" # Placeholderavatars
        })
    return users

def generate_exams():
    exams = [
        {
            "title": "Dhaka Bank - Management Trainee Officer (MTO)",
            "totalCandidates": 100,
            "totalSlots": 5,
            "questionSets": 25,
            "questionType": "MCQ",
            "startTime": "2026-05-10T10:00",
            "endTime": "2026-05-10T12:00",
            "duration": 60,
            "negativeMarking": 0.25,
            "questions": [
                {
                    "title": "What is the primary function of a commercial bank?",
                    "type": "RADIO",
                    "options": [
                        {"text": "Accepting deposits", "isCorrect": True},
                        {"text": "Formulating monetary policy", "isCorrect": False},
                        {"text": "Printing currency", "isCorrect": False},
                        {"text": "Regulating stock market", "isCorrect": False}
                    ]
                },
                {
                    "title": "Which organization regulates banks in Bangladesh?",
                    "type": "RADIO",
                    "options": [
                        {"text": "Ministry of Finance", "isCorrect": False},
                        {"text": "Bangladesh Bank", "isCorrect": True},
                        {"text": "SEC", "isCorrect": False},
                        {"text": "NBR", "isCorrect": False}
                    ]
                }
            ]
        },
        {
            "title": "Akij Resource - IT Specialist Recruitment",
            "totalCandidates": 50,
            "totalSlots": 2,
            "questionSets": 15,
            "questionType": "BOTH",
            "startTime": "2026-04-20T14:00",
            "endTime": "2026-04-20T16:00",
            "duration": 90,
            "negativeMarking": 0.5,
            "questions": [
                {
                    "title": "Which of these is a NoSQL database?",
                    "type": "CHECKBOX",
                    "options": [
                        {"text": "MongoDB", "isCorrect": True},
                        {"text": "PostgreSQL", "isCorrect": False},
                        {"text": "Redis", "isCorrect": True},
                        {"text": "MySQL", "isCorrect": False}
                    ]
                },
                {
                    "title": "Explain the concept of Dependency Injection in React.",
                    "type": "TEXT",
                    "options": []
                }
            ]
        }
    ]
    return exams

if __name__ == "__main__":
    import os
    os.makedirs("public/data", exist_ok=True)
    
    users = generate_users()
    exams = generate_exams()
    
    with open("public/data/users.json", "w") as f:
        json.dump(users, f, indent=2)
        
    with open("public/data/exams.json", "w") as f:
        json.dump(exams, f, indent=2)
        
    print(f"Generated {len(users)} users and {len(exams)} exams in public/data/")
