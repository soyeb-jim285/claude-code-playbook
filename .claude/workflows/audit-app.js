export const meta = {
  name: 'audit-app',
  description: 'Audit the notes app on three dimensions and adversarially verify every finding',
  whenToUse: 'Before a release, or after a large change to src/ or public/',
  phases: [
    { title: 'Review', detail: 'one reviewer per dimension' },
    { title: 'Verify', detail: 'one skeptic per finding' },
  ],
}

const FINDINGS = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          file: { type: 'string' },
          line: { type: 'number' },
          title: { type: 'string' },
          evidence: { type: 'string' },
        },
        required: ['file', 'line', 'title', 'evidence'],
      },
    },
  },
  required: ['findings'],
}

const VERDICT = {
  type: 'object',
  properties: {
    refuted: { type: 'boolean' },
    reason: { type: 'string' },
  },
  required: ['refuted', 'reason'],
}

const DIMENSIONS = [
  { key: 'correctness', focus: 'logic errors and behavior that contradicts the code or tests' },
  { key: 'security', focus: 'injection, unsafe rendering of user input, and missing input limits' },
  { key: 'accessibility', focus: 'missing accessible names, keyboard traps, and unannounced errors' },
]

const scope = args || 'src/ and public/'

const results = await pipeline(
  DIMENSIONS,
  (d) => agent(`Review ${scope} for ${d.focus}. Report only problems you can demonstrate from the code.`, {
    label: `review:${d.key}`,
    phase: 'Review',
    agentType: 'code-reviewer',
    schema: FINDINGS,
  }),
  (review, d) => parallel(review.findings.map((f) => () =>
    agent(
      `Try to refute this ${d.key} finding by reading the code.\n` +
      `${f.file}:${f.line} ${f.title}\nEvidence: ${f.evidence}\n` +
      'Set refuted=true if it is wrong, unreachable, or you cannot confirm it.',
      { label: `verify:${f.file}:${f.line}`, phase: 'Verify', agentType: 'code-reviewer', schema: VERDICT },
    ).then((verdict) => ({ ...f, dimension: d.key, verdict })),
  )),
)

const all = results.filter(Boolean).flat().filter(Boolean)
const confirmed = all.filter((f) => f.verdict && !f.verdict.refuted)
const refuted = all.filter((f) => f.verdict?.refuted)
const unverified = all.filter((f) => !f.verdict)

log(`${confirmed.length} confirmed, ${refuted.length} refuted, ${unverified.length} unverified`)
return { confirmed, refuted, unverified }
