# Hypothesis: Enriching Patient Data to Predict Drug Adherence Drop-off

## The Problem

When patients enroll in specialty drug programs (Humira, Keytruda, Skyrizi, Wegovy), the enrollment forms collect:
- Name, DOB, address, phone, email
- Insurance information (primary, secondary, pharmacy)
- Diagnosis and prescription details
- Healthcare provider info
- Consent/authorization

**What's missing:** Anything about the patient's life circumstances that predict whether they'll actually stick with the medication.

---

## What the Research Says

### Strongest Predictors of Non-Adherence (from meta-analyses)

| Factor | Effect Size | Source |
|--------|------------|--------|
| **Food insecurity** | aOR = 0.56 (strongest) | PMC 2021 systematic review |
| **Housing instability** | aOR = 0.64 | PMC 2021 systematic review |
| **Prior adherence history** | Best single predictor | JMCP 2018 |
| **Cost/copay burden** | Significant | Multiple studies |
| **Transportation challenges** | 46% of specialty pharmacy patients | UCSF SIREN study |
| **Health literacy** | Moderate effect | WHO adherence report |
| **Polypharmacy** (5+ meds) | Significant for older adults | NHANES analysis |
| **Mental health comorbidity** | Depression = 2x non-adherence | Multiple meta-analyses |

### Weaker/Inconsistent Predictors
- Education level alone (not significant in most meta-analyses)
- Income level alone (significant only via downstream effects like cost burden)
- Age (mixed - older adults more adherent for some drugs, less for complex regimens)
- Gender (not consistently significant)
- Marital status (weak positive effect)

### Key Insight
**Socioeconomic status matters, but through specific mechanisms** - not as a blanket predictor. A high-income patient with depression and no social support may drop off faster than a low-income patient with strong family involvement and transportation access.

---

## What Apollo.io People Match API Returns

We tested enrichment on 4 real people:

### Person 1: Emre Sahin (emresahins@gmail.com)
- **Match quality:** Minimal - no title, no location, no org
- **Usefulness for adherence:** Very low

### Person 2: Emre Sarbak (emre.sarbak@gmail.com)
- **Title:** Co-Founder @ Emotion Machine
- **Location:** San Francisco, CA
- **Seniority:** Founder
- **Departments:** C-Suite
- **Employment history:** 4x founder, ex-McKinsey, Board Member at RC Alumni Association
- **Usefulness for adherence:** Moderate - can infer education level (McKinsey = top university), income bracket (founder/ex-consulting), location stability

### Person 3: Sarah Searls (ssearls2@gmail.com)
- **Title:** Software Engineer
- **Location:** Boston, MA
- **Seniority:** Entry-level
- **Org:** Crayon (64 employees, IT)
- **Usefulness for adherence:** Moderate - can infer age range (entry-level), income bracket (tech salary), location, employer size (small = potentially worse insurance)

### Person 4: Lisa Searls (searls.lisa@gmail.com)
- **Match quality:** Minimal - no title, no location, no org
- **Usefulness for adherence:** Very low

### Apollo API Fields Summary
| Field | Available | Useful for Adherence? |
|-------|-----------|----------------------|
| Title/Seniority | Yes | Proxy for income/education |
| Location (city/state) | Yes | Transportation access, urban vs rural |
| Company size | Yes | Insurance quality proxy |
| Industry | Yes | Work schedule flexibility |
| Employment history | Yes | Job stability, income trajectory |
| Education | No (not returned) | N/A |
| Income | No (not returned) | N/A |
| Age/DOB | No (not returned) | N/A |
| Gender | No (not returned) | N/A |
| Marital status | No | N/A |
| Health data | No | N/A |

---

## Apollo's Limitations for This Use Case

**Apollo is a B2B sales intelligence tool.** It's designed to find decision-makers at companies, not to profile consumers/patients. Key gaps:

1. **No education data** - Apollo doesn't return degrees or education level
2. **No income data** - No salary or income range
3. **No demographic data** - No age, gender, ethnicity, family status
4. **Gmail addresses = low match rate** - 2 of 4 people returned minimal data. Apollo works best with work emails
5. **Patients are consumers, not prospects** - Many patients (elderly, retired, unemployed) won't be in Apollo at all

---

## Better Data Sources for Patient Adherence Enrichment

### Tier 1: Available at Enrollment (Add to Form)
These could be added as optional fields on enrollment forms:

| Data Point | Why It Predicts | How to Collect |
|------------|----------------|----------------|
| **# of other medications** | Polypharmacy = complexity burden | "How many prescription medications do you currently take?" |
| **Transportation access** | Can't get to pharmacy/infusion center | "How do you usually get to your pharmacy?" (drive/bus/ride/walk) |
| **Living situation** | Social support proxy | "Do you live alone?" |
| **Prior specialty drug experience** | Past adherence predicts future | "Have you taken a specialty medication before?" |
| **Preferred reminder channel** | Engagement prediction | Already in Adhery's system |

### Tier 2: Inferred from Address (No API Needed)
From the patient's ZIP code alone, you can derive:

| Data Point | Source | Cost |
|------------|--------|------|
| **Median household income** | US Census / ACS data | Free |
| **% uninsured in area** | Census | Free |
| **Rural vs urban** | RUCA codes | Free |
| **Food desert indicator** | USDA Food Access Research Atlas | Free |
| **Pharmacy density** | NACDS / pharmacy databases | Free |
| **Health Professional Shortage Area** | HRSA HPSA data | Free |
| **Social Deprivation Index (SDI)** | Robert Graham Center | Free |
| **Area Deprivation Index (ADI)** | University of Wisconsin | Free |

### Tier 3: Consumer Data Enrichment APIs (Better than Apollo)
| Provider | Data | Cost | Notes |
|----------|------|------|-------|
| **Experian ConsumerView** | Income, education, home ownership, household composition, age | $$$ | Gold standard for consumer enrichment |
| **Acxiom/LiveRamp** | Demographics, lifestyle, purchasing behavior | $$$ | Used by pharma companies already |
| **LexisNexis Risk Solutions** | Identity verification + SDoH indicators | $$ | HIPAA-compliant, designed for healthcare |
| **Socially Determined** | SDoH risk scores from address | $$ | Purpose-built for healthcare adherence |
| **Claritas PRIZM** | Lifestyle segmentation by ZIP+4 | $$ | "Young Digerati" vs "Golden Ponds" etc. |

### Tier 4: Within Adhery's Own System (Most Valuable)
The best predictor of future adherence is **behavioral data from early interactions:**

| Signal | What It Means | When Available |
|--------|--------------|----------------|
| Response time to first SMS | Engagement level | Day 1-3 |
| Opted out of voice calls | Channel preference / avoidance | Day 1 |
| Missed first refill window | Early drop-off signal | Week 2-4 |
| Sentiment in voice calls | Emotional state / barriers | First call |
| Questions about cost | Cost barrier present | First interaction |
| Mentioned side effects early | May discontinue | First week |

---

## Proposed Adherence Risk Score Model

### Input Features (Ranked by Predictive Power)

**From Adhery's own interaction data (strongest):**
1. Response rate to outreach (SMS/voice)
2. Time to first response
3. Sentiment score from voice calls
4. Mentions of cost/insurance issues
5. Side effect reporting frequency

**From enrollment form (add these fields):**
6. Number of concurrent medications
7. Prior specialty drug experience (yes/no)
8. Transportation method to pharmacy
9. Lives alone (yes/no)

**From ZIP code enrichment (free):**
10. Area Deprivation Index score
11. Rural vs urban classification
12. Food desert indicator
13. Pharmacy density in ZIP

**From consumer data enrichment (paid, if budget allows):**
14. Estimated household income range
15. Education level
16. Home ownership status
17. Household size

---

## Test Patient Profiles (Real + Synthetic)

### Real People (Apollo-Enriched)

| Name | Location | Occupation | Inferred Risk Factors | Predicted Adherence Risk |
|------|----------|-----------|----------------------|------------------------|
| Emre Sahin | Unknown | Unknown | No data - cannot score | UNKNOWN |
| Emre Sarbak | SF, CA | Tech founder | High income, high education, but: demanding schedule, potentially irregular routine | LOW-MEDIUM |
| Sarah Searls | Boston, MA | Software eng (entry) | Young, entry-level salary, small company insurance, but: urban location, tech-literate | LOW |
| Lisa Searls | Unknown | Unknown | No data - cannot score | UNKNOWN |

### Synthetic People (Covering Missing Segments)

| Name | Age | Location | Occupation | Insurance | Key Risk Factors | Predicted Risk |
|------|-----|----------|-----------|-----------|-----------------|---------------|
| Dorothy Williams | 72 | Rural AR (ZIP 72032) | Retired teacher | Medicare Part D | Lives alone, 6 medications, rural (nearest pharmacy 22mi), ADI score 89/100 | **HIGH** |
| Marcus Johnson | 34 | Detroit, MI (ZIP 48205) | Warehouse worker, night shift | Employer (high deductible) | Food desert ZIP, irregular work schedule, no car (relies on bus), cost-sensitive | **HIGH** |
| Patricia Chen | 45 | Suburban NJ (ZIP 07030) | Accountant | PPO (good coverage) | Married, 2 kids, moderate income, good pharmacy access, but: depression dx, 3 other meds | **MEDIUM** |
| Roberto Martinez | 58 | Miami, FL (ZIP 33125) | Self-employed contractor | ACA marketplace (Silver) | Language barrier (Spanish primary), gaps in coverage history, copay concerns, but: strong family support, wife manages meds | **MEDIUM** |
| Ashley Turner | 26 | Nashville, TN (ZIP 37203) | Barista/gig worker | Uninsured -> PAP eligible | First specialty drug, no prior adherence history, housing instability (moved 3x in 2 years), but: highly motivated (new diagnosis) | **HIGH** |
| James O'Brien | 65 | Chicago, IL (ZIP 60614) | Retired executive | Medicare + supplemental | High income, excellent coverage, stable housing, lives with spouse, but: 8 medications, mild cognitive decline, doesn't use smartphone | **MEDIUM-HIGH** |

---

## Recommendation

### Don't use Apollo for this. Instead:

1. **Add 4-5 SDoH screening questions to the enrollment flow** (takes 30 seconds for patient to answer, huge predictive value)

2. **Enrich every patient's ZIP code** with free Census/HRSA/USDA data to get area-level risk indicators. This costs $0 and gives you 80% of what paid enrichment provides.

3. **Build the risk score from Adhery's own behavioral data** - the first 7 days of interaction patterns will be the single best predictor. This is Adhery's moat: the AI agent generates the data that predicts drop-off.

4. **If budget allows**, integrate LexisNexis Risk Solutions or Socially Determined for individual-level SDoH scores. These are HIPAA-compliant and designed for exactly this use case.

5. **The killer feature**: Adhery detects drop-off risk in real-time from conversation patterns (sentiment shifts, longer response times, cost questions) and escalates before the patient actually drops off. No other enrichment source can do this.

---

## Sources

- [Social Determinants and Medication Adherence - Systematic Review (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC8131473/)
- [SDoH and Medication Adherence in Older Adults (NHANES)](https://pmc.ncbi.nlm.nih.gov/articles/PMC11859998/)
- [Specialty Pharmacy SDoH Screening (AJHP)](https://academic.oup.com/ajhp/article-abstract/83/3/e142/8184479)
- [Machine Learning for Medication Adherence - Scoping Review (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10414315/)
- [Predicting Adherence with Ensemble/Deep Learning (Nature)](https://www.nature.com/articles/s41598-021-98387-w)
- [Prior Adherence Predicts Future Adherence (JMCP)](https://www.jmcp.org/doi/10.18553/jmcp.2018.24.11.1146)
- [Adherence Influencing Factors Overview (Systematic Reviews)](https://systematicreviewsjournal.biomedcentral.com/articles/10.1186/s13643-019-1014-8)
- [2024 a:care Congress on Non-Adherence (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC12096470/)
- [Pharmacoequity Measurement Framework (JMCP)](https://www.jmcp.org/doi/10.18553/jmcp.2025.31.2.214)
