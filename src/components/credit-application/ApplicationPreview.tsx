import type { CreditApplication } from "@/types/credit-application";
import { formatBDT } from "./shared";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";

interface Props {
  data: CreditApplication;
  onBack: () => void;
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <tr className="border-b border-border">
    <td className="py-1.5 px-2 text-xs text-muted-foreground w-1/3 align-top">{label}</td>
    <td className="py-1.5 px-2 text-xs font-medium text-foreground">{value || "—"}</td>
  </tr>
);

const SectionHeader = ({ num, title }: { num: number; title: string }) => (
  <tr className="bg-primary/5">
    <td colSpan={2} className="py-2 px-2 text-sm font-bold text-primary">
      {num}. {title}
    </td>
  </tr>
);

const ApplicationPreview = ({ data, onBack }: Props) => {
  const d = data;
  const ks = d.keySummary;

  const handlePrint = () => window.print();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between print:hidden">
        <Button variant="outline" onClick={onBack}><ArrowLeft className="h-4 w-4 mr-1" /> Back to Form</Button>
        <Button onClick={handlePrint}><Printer className="h-4 w-4 mr-1" /> Print / Export PDF</Button>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 print:border-none print:p-0" id="print-area">
        {/* Header */}
        <div className="text-center mb-6 border-b-2 border-primary pb-4">
          <h1 className="text-lg font-bold text-primary uppercase tracking-wider">Mutual Trust Bank Limited</h1>
          <h2 className="text-base font-semibold text-foreground mt-1">SME Credit Application — RM Memo (SBL)</h2>
          <p className="text-xs text-muted-foreground mt-1">Branch: {ks.branchName} | Ref: {ks.branchRefNo} | Date: {ks.memoDate}</p>
        </div>

        <table className="w-full border-collapse text-left">
          <tbody>
            {/* Section 1 */}
            <SectionHeader num={1} title="Key Summary" />
            <Row label="Business Name" value={ks.businessName} />
            <Row label="CIF No." value={ks.cifNo} />
            <Row label="Business Type" value={ks.businessType} />
            <Row label="Enterprise Type" value={ks.enterpriseType} />
            <Row label="Legal Status" value={ks.legalStatus} />
            <Row label="Exposure (Existing / O/S / Proposed)" value={`${formatBDT(ks.existingLimit)} / ${formatBDT(ks.existingOS)} / ${formatBDT(ks.proposedLimit)}`} />
            <Row label="Gender" value={ks.gender} />
            <Row label="Credit Memo Type" value={ks.creditMemoType} />
            <Row label="Credit Rating" value={ks.creditRating} />
            <Row label="Risk Weight" value={ks.riskWeight} />
            <Row label="Key Person" value={`${ks.keyPersonName} (${ks.keyPersonPosition})`} />
            <Row label="DoE Risk Category" value={ks.doeRiskCategory} />
            <Row label="ESRR Rating" value={ks.esrrRating} />
            <Row label="Registered Address" value={ks.registeredAddress} />
            <Row label="Business Description" value={ks.businessDescription} />

            {/* Section 2 */}
            <SectionHeader num={2} title="Proposed Facility with MTB" />
            {d.proposedFacilities.length === 0 ? (
              <Row label="" value="No facilities proposed." />
            ) : d.proposedFacilities.map((f, i) => (
              <Row key={i} label={`Facility #${i + 1}`}
                value={`${f.facilityNature} | ${formatBDT(f.limit)} @ ${f.pricing}% | ${f.tenor} months | ${f.purpose}`} />
            ))}

            {/* Section 3 */}
            <SectionHeader num={3} title="Loan Exposure in All FIs" />
            {d.loanExposures.length === 0 ? (
              <Row label="" value="(NIL)" />
            ) : d.loanExposures.map((e, i) => (
              <Row key={i} label={e.fiName} value={`${e.facilityNature} | Limit: ${formatBDT(e.existingLimit)} | O/S: ${formatBDT(e.existingOS)}`} />
            ))}

            {/* Section 4 */}
            <SectionHeader num={4} title="Record of Bank Transaction" />
            {d.bankTransactions.length === 0 ? (
              <Row label="" value="No records." />
            ) : d.bankTransactions.map((t, i) => (
              <Row key={i} label={t.bankName} value={`${t.accountType} | Credit: ${formatBDT(t.totalCreditTransaction)} | Max: ${formatBDT(t.maxBalance)} | Min: ${formatBDT(t.minBalance)}`} />
            ))}

            {/* Section 5 */}
            <SectionHeader num={5} title="Previous Loan Closing History" />
            {d.closingHistory.length === 0 ? (
              <Row label="" value="No closing history." />
            ) : d.closingHistory.map((h, i) => (
              <Row key={i} label={h.fiName} value={`${h.facilityType} | Closed: ${h.closingDate} (${h.closingType})`} />
            ))}

            {/* Section 6 */}
            <SectionHeader num={6} title="Key Person's Information" />
            <Row label="Name" value={d.keyPerson.name} />
            <Row label="Designation" value={d.keyPerson.designation} />
            <Row label="NID" value={d.keyPerson.nidNo} />
            <Row label="Experience" value={`${d.keyPerson.businessExperienceYears} years`} />
            <Row label="Contact" value={d.keyPerson.contactNumber} />
            <Row label="Successor" value={`${d.keyPerson.successorName} (${d.keyPerson.relationshipWithSuccessor})`} />

            {/* Section 7 */}
            <SectionHeader num={7} title="Owner's Information" />
            {d.owners.map((o, i) => (
              <Row key={i} label={`Owner #${i + 1}`} value={`${o.name} | ${o.sharePercent}% | PNW: ${formatBDT(o.pnw)}`} />
            ))}

            {/* Section 8 */}
            <SectionHeader num={8} title="Premise Ownership" />
            {d.premises.map((p, i) => (
              <Row key={i} label={p.premiseType} value={`${p.address} | ${p.areaSft} SFT | ${p.ownershipStatus}`} />
            ))}

            {/* Section 9 */}
            <SectionHeader num={9} title="Other Business Information" />
            <Row label="Manpower" value={`Male: ${d.otherBusiness.manpowerMale}, Female: ${d.otherBusiness.manpowerFemale}`} />
            <Row label="Sales Mix" value={`Wholesale: ${d.otherBusiness.wholesalePercent}% | Retail: ${d.otherBusiness.retailPercent}% | Service: ${d.otherBusiness.servicePercent}%`} />
            <Row label="Trade License" value={`${d.otherBusiness.tradeLicenseNo} (Valid: ${d.otherBusiness.tradeLicenseValidity})`} />
            <Row label="Sales Keeping" value={d.otherBusiness.salesKeeping} />

            {/* Section 10 */}
            <SectionHeader num={10} title="Working Capital Requirement" />
            <Row label="Total W/C Requirement" value={formatBDT(d.workingCapital.totalWcRequirement)} />
            <Row label="Existing W/C Loan" value={formatBDT(d.workingCapital.existingWcLoan)} />
            <Row label="Scope for Additional" value={formatBDT(d.workingCapital.scopeAdditionalWc)} />
            <Row label="Debt:Equity" value={d.workingCapital.debtEquityRatio} />

            {/* Section 11 */}
            <SectionHeader num={11} title="Sister / Allied Concern" />
            {d.sisterConcerns.isNA ? (
              <Row label="" value="N/A" />
            ) : d.sisterConcerns.rows.map((s, i) => (
              <Row key={i} label={s.concernName} value={`${s.businessNature} | Investment: ${formatBDT(s.totalInvestment)} | Turnover: ${formatBDT(s.turnover)}`} />
            ))}

            {/* Section 12 */}
            <SectionHeader num={12} title="AML/CFT Declaration" />
            {d.amlCft.map((item, i) => (
              <Row key={i} label={`${i + 1}. ${item.label.substring(0, 50)}...`} value={`${item.status || "—"} ${item.remarks ? `(${item.remarks})` : ""}`} />
            ))}

            {/* Section 13 */}
            <SectionHeader num={13} title="CIB Compliance" />
            {d.cibCompliance.length === 0 ? (
              <Row label="" value="No CIB entries." />
            ) : d.cibCompliance.map((c, i) => (
              <Row key={i} label={c.name} value={`Code: ${c.cibCode} | Status: ${c.status}`} />
            ))}

            {/* Section 14 */}
            <SectionHeader num={14} title="Personal Guarantors" />
            {d.guarantors.length === 0 ? (
              <Row label="" value="No guarantors." />
            ) : d.guarantors.map((g, i) => (
              <Row key={i} label={g.name} value={`Age: ${g.age} | PNW: ${formatBDT(g.pnw)} | Relation: ${g.relationWithBorrower}`} />
            ))}

            {/* Section 15 */}
            <SectionHeader num={15} title="Visit Report" />
            <Row label="Visit Date" value={d.visitReport.visitDate} />
            <Row label="Visitor 1" value={`${d.visitReport.visitor1Name} (${d.visitReport.visitor1Designation})`} />
            <Row label="Visitor 2" value={`${d.visitReport.visitor2Name} (${d.visitReport.visitor2Designation})`} />
            <Row label="Client Present" value={d.visitReport.clientPresent} />
            <Row label="Notes" value={d.visitReport.visitNotes} />

            {/* Section 16 */}
            <SectionHeader num={16} title="Exceptions" />
            {d.exceptions.length === 0 ? (
              <Row label="" value="No exceptions." />
            ) : d.exceptions.map((ex, i) => (
              <Row key={i} label={ex.parameter} value={ex.actualException} />
            ))}

            {/* Section 17 */}
            <SectionHeader num={17} title="Basis of Recommendation" />
            <Row label="Recommendation" value={d.recommendation.freeText} />
            {d.recommendation.bullets.filter(b => b.enabled).map((b, i) => (
              <Row key={i} label={`• Point ${i + 1}`} value={b.text} />
            ))}

            {/* Section 18 */}
            <SectionHeader num={18} title="Recommendation / Signatures" />
            <Row label="MAKER" value={`${d.signatures.makerName} — ${d.signatures.makerDesignation}`} />
            <Row label="CLUSTER HEAD" value={`${d.signatures.clusterHeadName} — ${d.signatures.clusterHeadDesignation}`} />
            <Row label="CHECKER" value={`${d.signatures.checkerName} — ${d.signatures.checkerDesignation}`} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationPreview;
