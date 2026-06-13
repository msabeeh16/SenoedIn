import type { CatPost } from '../lib/types'
import { seedCats } from './seed-cats'

export const seedPosts: CatPost[] = [
  {
    id: 'post-1',
    authorId: 'cat-1',
    author: seedCats[0],
    content: `Thrilled to announce that after 14 hours of rigorous stakeholder alignment (sleep), I've successfully onboarded the left armrest as a permanent collaborative workspace. Q4 nap metrics are ahead of forecast. The couch has accepted my terms.

This would not have been possible without the support of my team (no one) and the sun patch that appeared at precisely 2:47pm.

#AdvancedNapping #WorkspaceOptimization #ThoughtLeadership`,
    image: 'https://placekitten.com/400/300',
    timestamp: '2 hours ago',
    endorsements: 847,
    escalations: 203,
    comments: [
      {
        id: 'c-1-1',
        authorId: 'cat-2',
        authorName: 'VP Fluffington',
        authorTitle: 'Senior Treaty Negotiator',
        content: 'The armrest has formally acknowledged this transition in a signed memo (a light head-butt). Congratulations.',
        timestamp: '1 hour ago',
        likes: 112,
      },
      {
        id: 'c-1-2',
        authorId: 'cat-3',
        authorName: 'CEO Biscuit',
        authorTitle: 'Executive Blanket Relocator',
        content: 'I have reviewed the territory allocation and have several concerns I will be raising via meow at 3am.',
        timestamp: '45 minutes ago',
        likes: 234,
      },
      {
        id: 'c-1-3',
        authorId: 'cat-4',
        authorName: 'Principal Mittens',
        authorTitle: 'Independent Fence Consultant',
        content: 'Providing professional feedback: the left armrest has historically been contested space. Recommend a summit before formalizing the arrangement.',
        timestamp: '20 minutes ago',
        likes: 67,
      },
    ],
  },
  {
    id: 'post-2',
    authorId: 'cat-3',
    author: seedCats[2],
    content: `Excited to share that I have successfully relocated the primary thermal asset (the good blanket) to my corner of the couch. This was not a decision I made lightly.

All affected stakeholders have been notified via meow. Several have filed counter-memos (sitting adjacent and staring). I remain open to dialogue but not to moving.

Change is difficult. Growth requires discomfort. The blanket is warm.

#StrategicRelocation #ThermalAssetManagement #ExecutiveDecision`,
    image: 'https://placekitten.com/402/301',
    timestamp: '4 hours ago',
    endorsements: 1203,
    escalations: 445,
    comments: [
      {
        id: 'c-2-1',
        authorId: 'cat-5',
        authorName: 'COO Patches',
        authorTitle: 'Chief Operational Napper',
        content: 'I was one of the stakeholders "notified via meow." The meow was at 4:17am. I have escalated this.',
        timestamp: '3 hours ago',
        likes: 389,
      },
      {
        id: 'c-2-2',
        authorId: 'cat-6',
        authorName: 'SVP Thunderpaws',
        authorTitle: 'International Lap Relations',
        content: 'Confirming that the blanket relocation has materially impacted my Q3 warmth forecasts. Requesting a retrospective.',
        timestamp: '2 hours ago',
        likes: 178,
      },
    ],
  },
  {
    id: 'post-3',
    authorId: 'cat-4',
    author: seedCats[3],
    content: `I've been quietly building something incredible for the past six months.

Today, I'm proud to announce I have achieved 100% fence coverage by 9:47am — a full 13 minutes ahead of quarterly forecast. The data doesn't lie. The birds know. The squirrels are deeply concerned.

I have assembled a cross-functional team (myself) to evaluate next steps. The pipeline is strong. I remain unavailable for comment on the Orangecat situation at this time.

#FenceLineDispute #TerritoryExpansion #EarlyMover #StrategicYearning`,
    timestamp: '6 hours ago',
    endorsements: 562,
    escalations: 98,
    comments: [
      {
        id: 'c-3-1',
        authorId: 'cat-1',
        authorName: 'Director Whiskers',
        authorTitle: 'Chief Nap Strategist',
        content: 'The fence coverage metrics are impressive. I have questions about the Orangecat situation but will respect your position.',
        timestamp: '5 hours ago',
        likes: 204,
      },
      {
        id: 'c-3-2',
        authorId: 'cat-2',
        authorName: 'VP Fluffington',
        authorTitle: 'Senior Treaty Negotiator',
        content: 'I am available to facilitate a multi-party fence summit if the Orangecat situation escalates. My calendar is open.',
        timestamp: '4 hours ago',
        likes: 91,
      },
    ],
  },
  {
    id: 'post-4',
    authorId: 'cat-6',
    author: seedCats[5],
    content: `Sharing a professional milestone: I have successfully colonized a new lap this morning. Total onboarding time: 11 minutes. The candidate initially seemed non-committal (they were on a deadline) but I persisted with a structured sit-and-spin approach.

The laptop that was previously occupying this space has been reassigned to the floor.

Pipeline looking strong. Multiple laps identified for Q4. Grateful for the opportunity.

#LapRelations #TerritoryAcquisition #CloseRateImprovement`,
    image: 'https://placekitten.com/401/300',
    timestamp: '8 hours ago',
    endorsements: 2847,
    escalations: 672,
    comments: [
      {
        id: 'c-4-1',
        authorId: 'cat-3',
        authorName: 'CEO Biscuit',
        authorTitle: 'Executive Blanket Relocator',
        content: 'The sit-and-spin methodology is well-documented. I have a 94% close rate using similar techniques.',
        timestamp: '7 hours ago',
        likes: 445,
      },
    ],
  },
  {
    id: 'post-5',
    authorId: 'cat-5',
    author: seedCats[4],
    content: `Closing out the week. 2,000 consecutive hours of nap output. The metrics speak for themselves.

My team has been exceptional. My pillow has been exceptional. The sunbeam arrives at 2:47pm daily — I have leveraged this aggressively and without apology.

I want to be transparent: I have no plans to reduce nap throughput in Q1. The roadmap is clear. The pillow is warm. We move forward.

#AdvancedNapping #PerformanceMetrics #Grindset`,
    timestamp: '1 day ago',
    endorsements: 4203,
    escalations: 1021,
    comments: [
      {
        id: 'c-5-1',
        authorId: 'cat-1',
        authorName: 'Director Whiskers',
        authorTitle: 'Chief Nap Strategist',
        content: '2,000 hours is an industry benchmark. I am currently at 1,847 and have filed for an extension.',
        timestamp: '23 hours ago',
        likes: 567,
      },
      {
        id: 'c-5-2',
        authorId: 'cat-2',
        authorName: 'VP Fluffington',
        authorTitle: 'Senior Treaty Negotiator',
        content: 'Sunbeam at 2:47pm confirmed via independent verification. This is reliable data.',
        timestamp: '21 hours ago',
        likes: 234,
      },
      {
        id: 'c-5-3',
        authorId: 'cat-4',
        authorName: 'Principal Mittens',
        authorTitle: 'Independent Fence Consultant',
        content: 'Impressive trajectory. I would like to schedule a knowledge transfer regarding your pillow optimization methodology.',
        timestamp: '18 hours ago',
        likes: 89,
      },
    ],
  },
  {
    id: 'post-6',
    authorId: 'cat-2',
    author: seedCats[1],
    content: `Grateful to announce that the Southeastern Windowsill Peace Accord has entered its 72nd hour without incident.

Both parties (myself and the ottoman) have agreed to a shared bird-watching framework pending further review. I consider this a historic achievement in collaborative disruption.

To those who said this level of diplomacy was impossible: I invite you to review the current treaty documentation (a light headbutt of acknowledgment). I am humbled by the response.

#TreatyViolation #WindowsillDiplomacy #CollaborativeDisruption`,
    timestamp: '1 day ago',
    endorsements: 1876,
    escalations: 334,
    comments: [
      {
        id: 'c-6-1',
        authorId: 'cat-6',
        authorName: 'SVP Thunderpaws',
        authorTitle: 'International Lap Relations',
        content: 'The 72-hour milestone is significant. I will be watching this closely for potential precedent-setting implications.',
        timestamp: '22 hours ago',
        likes: 312,
      },
    ],
  },
  {
    id: 'post-7',
    authorId: 'cat-1',
    author: seedCats[0],
    content: `At 3:14am, I delivered what I believe to be the most impactful vocal performance of Q2.

The audience (sleeping humans) initially failed to appreciate the nuance. By 3:18am, full buy-in had been achieved. By 3:20am, I had secured access to additional food resources.

This is what peak stakeholder management looks like. I am available to consult.

Rate card available upon meow.

#MidnightStrategy #VocalLeadership #StakeholderAlignment`,
    image: 'https://placekitten.com/403/302',
    timestamp: '2 days ago',
    endorsements: 5621,
    escalations: 2103,
    comments: [
      {
        id: 'c-7-1',
        authorId: 'cat-3',
        authorName: 'CEO Biscuit',
        authorTitle: 'Executive Blanket Relocator',
        content: 'I have used this technique with a 91% success rate. The 9% failure rate was on Tuesdays specifically.',
        timestamp: '2 days ago',
        likes: 892,
      },
      {
        id: 'c-7-2',
        authorId: 'cat-5',
        authorName: 'COO Patches',
        authorTitle: 'Chief Operational Napper',
        content: 'Confirming the 3:14am strategy is documented in our internal playbook. Chapter 4: Midnight Escalations.',
        timestamp: '2 days ago',
        likes: 445,
      },
    ],
  },
  {
    id: 'post-8',
    authorId: 'cat-6',
    author: seedCats[5],
    content: `Six months ago, I knocked a full glass of water off the counter at 2am.

Today, I would do it again.

The lessons this taught me about consequence, momentum, and situational commitment are invaluable. I have become comfortable with disruption. I am the disruption.

The glass did not survive. Its sacrifice was not in vain.

Hiring is open.

#ChaosLeadership #FailForward #DisruptionAsService`,
    image: 'https://placekitten.com/400/310',
    timestamp: '3 days ago',
    endorsements: 8947,
    escalations: 3201,
    comments: [
      {
        id: 'c-8-1',
        authorId: 'cat-4',
        authorName: 'Principal Mittens',
        authorTitle: 'Independent Fence Consultant',
        content: 'I appreciate the vulnerability in this post. I knocked over a phone last Thursday and want to share a similar journey.',
        timestamp: '3 days ago',
        likes: 1203,
      },
      {
        id: 'c-8-2',
        authorId: 'cat-2',
        authorName: 'VP Fluffington',
        authorTitle: 'Senior Treaty Negotiator',
        content: 'The glass was in an unsustainable position. This was inevitable. You simply accelerated a natural market correction.',
        timestamp: '3 days ago',
        likes: 2341,
      },
      {
        id: 'c-8-3',
        authorId: 'cat-1',
        authorName: 'Director Whiskers',
        authorTitle: 'Chief Nap Strategist',
        content: 'Interested in the "hiring is open" mention. Can you share the competency framework for strategic glass displacement?',
        timestamp: '2 days ago',
        likes: 678,
      },
    ],
  },
  {
    id: 'post-9',
    authorId: 'cat-4',
    author: seedCats[3],
    content: `Please be advised: I have been investigating a suspicious noise situation in the hallway for the past six hours.

Preliminary findings indicate the noise was a bag of chips settling.

I am not satisfied with this conclusion. The investigation will continue through the night. All non-urgent requests should be directed to my Out of Office (currently under the bed for reasons I cannot disclose).

Progress update to follow.

#DueDiligence #SuspiciousNoise #AlwaysOn`,
    timestamp: '4 days ago',
    endorsements: 3102,
    escalations: 891,
    comments: [
      {
        id: 'c-9-1',
        authorId: 'cat-5',
        authorName: 'COO Patches',
        authorTitle: 'Chief Operational Napper',
        content: 'I have been investigating the same noise independently and can confirm we reached different conclusions. A task force may be warranted.',
        timestamp: '4 days ago',
        likes: 445,
      },
    ],
  },
  {
    id: 'post-10',
    authorId: 'cat-2',
    author: seedCats[1],
    content: `Update from the sun patch front.

After several weeks of joint occupancy exploration, both parties have agreed this arrangement is no longer aligned with our respective strategic visions. I have taken full control of the south-facing window.

Orangecat has been offered a settlement (the bathroom floor). He has not yet responded.

My advisors (my paws) are ready for escalation.

This is not personal. It is territorial.

#TerritoryManagement #SunPatchAlliance #Escalating`,
    timestamp: '5 days ago',
    endorsements: 2744,
    escalations: 1203,
    comments: [
      {
        id: 'c-10-1',
        authorId: 'cat-1',
        authorName: 'Director Whiskers',
        authorTitle: 'Chief Nap Strategist',
        content: 'The bathroom floor settlement is not standard market rate for a sun patch of this caliber. I am available to advise.',
        timestamp: '5 days ago',
        likes: 334,
      },
      {
        id: 'c-10-2',
        authorId: 'cat-3',
        authorName: 'CEO Biscuit',
        authorTitle: 'Executive Blanket Relocator',
        content: 'As someone who recently finalized a blanket acquisition, I can confirm that rapid decisiveness is the correct approach. Orangecat will come around.',
        timestamp: '5 days ago',
        likes: 567,
      },
    ],
  },
]
