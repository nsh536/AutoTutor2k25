# 🎓 AutoTutor – AI Powered Smart Learning Assistant

AutoTutor is an intelligent, voice + video based tutoring application that uses **OpenAI Realtime models**, **Whisper speech recognition**, and **Supabase backend** to provide a highly interactive learning experience.

Students can:

✔ Ask doubts in real-time  
✔ Get concept explanations like “Explain Like I’m 5”  
✔ Prepare for exams with quizzes and feedback  

---

## 🚀 Features

| Feature | Description |
|--------|-------------|
| 🧠 AI Tutor Modes | Doubt Clearing • Mock Interview • Concept Learning • Exam Prep |
| 🗣 Whisper Speech-to-Text | Converts user speech to text instantly |
| 📚 Multiple Subjects Supported | Adaptive learning across topics |
| 💬 Realtime Streaming | No waiting — responses are instant |
| 🔐 Secure Authentication | Supabase Auth and role-based access |
| 🧾 Session Tracking | Stores conversation & learning progress |
| 🎙 Voice & Video Interaction | Chat with AI tutor like a real person |

---

## 🏗 System Architecture

React Frontend (WebRTC Video/Audio)
↓
OpenAI Realtime (gpt-4o voice model + Whisper)
↓
Supabase (Auth + DB + Edge Function)
↓
Analytics + Learner Profile


---

## 🧩 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React + TypeScript + WebRTC |
| Backend | Supabase Edge Functions |
| AI | GPT-4o Realtime + Whisper STT |
| Styling | TailwindCSS / ShadCN |
| Deployment | Supabase Hosting / Vercel |



## 🔧 Setup Instructions

### 1️⃣ Clone the repo
```bash
git clone https://github.com/yourname/AutoTutor2k25.git
cd AutoTutor2k25
2️⃣ Install dependencies
npm install
3️⃣ to run
npm run dev


🎯 Aim of the Project

The aim of AutoTutor is to develop an AI-powered real-time tutoring system that enables students to learn interactively through voice and video communication. The system leverages advanced AI models to clarify doubts, conduct mock interviews, explain concepts in an interactive manner, and support exam preparation — providing a personalized, accessible, and scalable learning experience.

✔ Objectives of the Project
🔹 Primary Objectives

To build an intelligent virtual tutor capable of real-time voice and video interaction with students.

To integrate OpenAI Realtime models (GPT-4o) for natural, conversational learning experiences.

To support multiple learning modes including doubt clearing, concept explanation, mock interviews, and exam preparation.

To implement Whisper speech recognition for accurate voice-to-text conversion.

To store user progress securely using Supabase authentication and database.

🔹 Secondary Objectives

To develop a user-friendly web application interface using React + Vite + TailwindCSS.

To implement Supabase Edge Functions for handling AI interactions and real-time session creation.

To generate quizzes and visual learning aids using AI to reinforce student knowledge.

To ensure responsive performance and low-latency streaming using WebRTC technologies.

To enhance accessibility by enabling hands-free, natural communication for remote learning.

🔹 Long-term Extendable Objectives

To support multiple subjects, skill levels, and personalized learning paths.

To provide analytics-based feedback for continuous student improvement.

To evolve the system into a scalable learning platform with teacher involvement.


🚀 Future Scope of AutoTutor

AutoTutor has strong potential for expansion and real-world adoption. Some future enhancements include:

Multi-Language Support

Enable tutoring in regional and international languages using multilingual speech models.

Advanced Knowledge Base Integration

Pull real-time educational resources from trusted sources and learning datasets.

Emotion & Engagement Detection

Analyze facial expressions and tone to understand student confusion and attention levels.

Smart Teacher Dashboard

Allow human teachers to monitor student progress, assign tasks, and review feedback.

Mobile Application Version

Launch Android & iOS apps for portable interactive learning.

Adaptive Learning Paths

AI will design personalized courses based on progress and learning behavior.

Gamification of Learning

Reward badges, streaks, leaderboards to improve student motivation.

Live Human Tutor Handover

Escalation from AI → human expert when necessary.

Offline Support

Allow some features to work without internet using local inference.

Integration with LMS and Schools

Connect with existing educational systems like Moodle, Google Classroom, etc.

🧠 What AutoTutor Can Do
Category	Capabilities
Learning Assistance	Explains concepts, clears doubts in simple language
Voice & Video Interaction	Communicates naturally like a real tutor
Speech Recognition	Converts voice to text using Whisper model
Adaptive Communication	Adjusts explanations based on difficulty level
Quiz Generation	Creates learning questions automatically
Mock Interview Training	Asks questions & provides feedback
Instant Response	Real-time streaming interaction
Student Progress Saving	Stores sessions and progress in Supabase

❌ What AutoTutor Cannot Do (Current Limitations)

Limitation	Explanation
No Deep Subject Expertise Guarantee	AI may hallucinate or provide inaccurate info
Requires Strong Internet	Real-time audio/video needs stable bandwidth
No Facial Emotion Detection	Cannot analyze student engagement yet
Limited Multi-language Support	Mainly optimized for English now
No Official Curriculum Alignment	Does not strictly follow school/university syllabus
Cannot Replace Human Teachers Entirely	AI guidance lacks empathy & human judgment
Potential Privacy Constraints	Requires secure handling of user voice/video data



🎯 Expected Outcomes

The AutoTutor system is expected to deliver the following results:

Improved Learning Engagement
Students interact through voice and visual conversation, making learning more active and enjoyable.

Better Concept Understanding
AI breaks down complex topics into simpler explanations tailored to the learner’s pace.

Increased Accessibility to Quality Education
Learners from rural or remote areas can access a tutor anytime without the need for a human expert.

Personalized Learning Experience
Students receive responses based on their questions, skill level, and learning needs.

Enhanced Confidence in Students
Through mock interviews and practice sessions, students improve communication and problem-solving skills.

Reduction in Learning Gaps
Students get instant help when stuck, preventing a buildup of confusion and backlog.

Scalable and Cost-Effective Education Model
One system can support thousands of students 24/7 without additional teaching staff.

🌍 Societal Impact

AutoTutor has the potential to positively influence education and society:

Impact Area	Benefits
Education Equality	Helps bridge the gap for students lacking access to good teachers
Rural Development	Students in remote villages can learn advanced subjects through AI
Special Education Support	Helps students who need extra assistance and personalized pace
Skill Development	Builds communication and interview skills that increase employability
Reduced Academic Anxiety	Friendly and encouraging AI improves student mental comfort
Economic Growth	Produces a better-skilled workforce for future industries
Inclusive Education	Available anytime, anywhere, and affordable to all
⚖ Ethical Considerations

While beneficial, ethical guardrails must remain in place:

Ensure secure handling of student data (privacy protection)

Prevent misinformation through monitored responses

Avoid replacing teachers completely—AI should support, not eliminate educators
