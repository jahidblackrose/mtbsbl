Project: Enterprise Banking System (ASP.NET Core & Oracle)

Backend:
- ASP.NET Core Web API
- Clean Architecture
- Service Layer

Database:
- Oracle Database
- Stored Procedures for transactions
- Transaction-safe operations

Authentication:
- JWT Access Token + Refresh Token

ARCHITECTURE REQUIREMENTS
Follow:
- Centralized exception handling
- Dependency Injection

Strict separation:
MVC

Frontend Integration:
- Define the Web Application Model (Frontend state)
- Define the View structure (UI Layout/Pages)
- Define the API Call patterns (Service-to-API integration)

SECURITY & COMPLIANCE (CRITICAL)
System must include:
- OWASP Top 10 protection
- SQL Injection prevention
- XSS & CSRF protection
- Encryption for sensitive data
- Secure password hashing
- Session timeout policy
- Audit logging for ALL actions
- Maker-Checker approval enforcement
- API rate limiting
- Secure configuration management

BANKING WORKFLOW REQUIREMENTS
Loan Flow:
Customer submits application
→ Maker reviews
→ Checker validates
→ Authorizer approves/rejects
→ System disburses

Every step must:
- Record audit trail
- Store timestamp
- Track acting user
- Maintain status history

OUTPUT IN STRUCTURED PHASES
DO NOT generate everything at once.

Generate step-by-step:

PHASE 1 — High-Level Architecture Design
(Include the interaction flow between View, Model, and API)

PHASE 2 — Folder & Solution Structure
(Separate Backend API and Frontend Web Application projects)

PHASE 3 — Frontend Architecture (Model, View, API Call)
(Detail how the Frontend Model maps to the API, how Views are structured, and how API calls are managed)

PHASE 4 — Security Hardening Layer

PHASE 5 — Deployment & DevOps Strategy

Constraints:
- Explain decisions like an enterprise architect.
- Avoid demo-level shortcuts.
- Assume system will serve 1M+ users.





* Shadcn UI (Design Inspiration): The overall "look and feel" (clean borders, rounded-xl corners, specific HSL
     variables) is inspired by ui.shadcn.com (https://ui.shadcn.com/). It is currently the most popular standard for
     modern enterprise dashboards.
   * Readymade UI (Login Layout): The sophisticated 2-column login layout was adapted from readymadeui.com
     (https://readymadeui.com/), which provides high-quality tailwind components.
   * Tailwind UI: Many of the sidebar and dashboard card patterns follow the official tailwindui.com
     (https://tailwindui.com/) enterprise application standards.
   * Lucide Icons: All iconography is powered by lucide.dev (https://lucide.dev/), providing sharp, consistent vector
     icons.
