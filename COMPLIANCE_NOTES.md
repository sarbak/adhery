# Adhery Compliance Notes

## HIPAA Compliance

### Overview
HIPAA is not a certification — it's a set of rules you self-attest to. A third-party assessor can validate and provide a compliance letter for buyer credibility.

### Requirements

**Administrative Safeguards**
- Designate Privacy Officer and Security Officer
- Written policies: privacy, security, breach notification, incident response
- Annual workforce HIPAA training
- Business Associate Agreements (BAAs) with all vendors touching PHI
- Formal risk assessment (documented, at least annually)

**Technical Safeguards**
- Encryption at rest (AES-256 for all PHI in databases)
- Encryption in transit (TLS 1.2+ everywhere)
- Role-based access controls with unique user IDs and session timeout
- Audit logging (every PHI access: who, what, when)
- Data backup with tested recovery procedures
- Multi-factor authentication for all PHI-containing systems

**Physical Safeguards**
- Cloud providers must be HIPAA-eligible
- Workstation security policies for team

**Breach Notification**
- Written procedure: detect, report, notify affected individuals within 60 days
- HHS notification for breaches affecting 500+ individuals

### Vendor BAA Status

| Vendor | BAA Available? | Plan Required |
|--------|---------------|---------------|
| Vercel | Yes | Enterprise plan |
| Supabase | Yes | Pro plan ($25/mo) |
| PostHog | Yes | Cloud plan (on request) |
| Twilio (future SMS) | Yes | Standard |
| LiveKit (future voice) | TBD | Need to verify |

### Current Gaps

| Gap | Severity |
|-----|----------|
| No database yet (no encryption at rest) | Critical |
| No audit logging | Critical |
| No BAAs with vendors | Critical |
| No written HIPAA policies | Critical |
| No access control/RBAC implementation | High |
| No incident response plan | High |
| PostHog tracking could capture PHI | Medium |
| No Privacy Officer designated | Medium |

### Timeline: 6-8 weeks
- Weeks 1-2: Write policies, designate officers, sign vendor BAAs, set up Supabase with encryption
- Weeks 3-4: Implement audit logging, RBAC, session management, MFA
- Weeks 5-6: Formal risk assessment (Vanta/Drata automates most of this)
- Weeks 7-8: Third-party HIPAA assessment (~$5-15K)

---

## SOC 2 Compliance

### Overview
SOC 2 is a formal audit by a licensed CPA firm. You get a report.

- **Type I** — controls are properly designed (point-in-time snapshot)
- **Type II** — controls actually worked over 3-12 month observation period

### Can We Say "SOC 2 Compliant" With Type I Only?
**Yes.** SOC 2 Type I is a legitimate report from a licensed CPA firm. Most startups selling to enterprise use Type I.

- Sophisticated buyers (large pharma, hospital systems) may ask "Type I or Type II?" and prefer Type II
- Most buyers just want to see the report exists
- Best phrasing: "SOC 2 Type I certified, Type II in progress"
- Landing page badge can say "SOC 2 Certified" after Type I

### Trust Service Criteria (for healthcare: Security + Availability + Confidentiality)

**Security (mandatory)**
- Access control with MFA
- Change management (code review, CI/CD, no direct prod access)
- Vulnerability management (dependency scanning, pen testing)
- Incident response procedures
- Employee background checks
- Security awareness training

**Availability**
- SLA commitments and monitoring
- Disaster recovery plan
- Uptime monitoring and alerting

**Confidentiality**
- Data classification policy
- Encryption at rest + in transit
- Data retention and disposal policies
- NDA requirements for employees/contractors

### Timeline
- SOC 2 Type I: 3-4 months from start
- SOC 2 Type II: 6-12 months after Type I (observation period required)

---

## Compliance Platform Options

| Platform | Cost/yr | Notes |
|----------|---------|-------|
| Vanta | ~$10-15K | Most popular for startups, auto-monitors infra |
| Drata | ~$10-15K | Strong alternative, good integrations |
| Secureframe | ~$8-12K | Slightly cheaper, good for small teams |

These platforms auto-collect evidence, monitor infra, provide policy templates, and connect you with auditors.

### Auditor Costs
- SOC 2 Type I: $15-25K
- SOC 2 Type II: $25-40K
- Partner auditor networks through Vanta/Drata offer discounted rates

---

## Total Cost Estimate (Year 1)

| Item | Cost |
|------|------|
| Compliance platform (Vanta/Drata) | $10-15K/yr |
| SOC 2 Type I audit | $15-25K |
| SOC 2 Type II audit | $25-40K |
| HIPAA third-party assessment | $5-15K |
| Vercel Enterprise (if needed for BAA) | ~$2-5K/mo |
| Supabase Pro (for BAA) | $25/mo |
| **Total Year 1** | **~$55-100K** |

---

## Action Plan

### Phase 1: Foundation (Weeks 1-4)
1. Sign up for Vanta or Drata
2. Upgrade Supabase to Pro, sign BAA
3. Evaluate Vercel Enterprise vs. HIPAA-eligible backend (AWS/GCP with BAA)
4. Write core policies (compliance platform provides templates)
5. Implement audit logging in the app
6. Formalize RBAC

### Phase 2: HIPAA Ready (Weeks 5-8)
1. Complete risk assessment
2. Sign all vendor BAAs
3. Implement MFA for admin access
4. HIPAA training for all team members
5. Third-party HIPAA assessment (optional but recommended)

### Phase 3: SOC 2 Type I (Months 3-4)
1. Engage auditor through compliance platform partner network
2. Remediate findings from readiness assessment
3. Complete Type I audit

### Phase 4: SOC 2 Type II (Months 6-12)
1. Maintain controls for observation period
2. Complete Type II audit

---

## Fastest Path for Pharma Buyers

Target: "HIPAA compliant + SOC 2 Type I certified, Type II in progress"

- HIPAA self-attestation + third-party letter: **6-8 weeks**
- SOC 2 Type I report: **3-4 months**
- SOC 2 Type II report: **9-12 months**

Most pharma buyers will accept this combination. That's the 4-month target.
