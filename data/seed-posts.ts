import type { CatPost } from '../lib/types'
import { seedCats } from './seed-cats'

export const seedPosts: CatPost[] = [
  {
    id: 'post-1',
    authorId: 'cat-1',
    author: seedCats[0],
    content: `Thrilled to announce that after 14 hours of rigorous stakeholder alignment (sleep), I have successfully onboarded the left armrest as a permanent collaborative workspace. Q4 nap metrics are ahead of forecast.

Pictured: Arthur, Chief Nap Officer, in peak form. This would not have been possible without the sun patch that arrived at precisely 2:47pm.

The ottoman has been notified. Talks are ongoing.

#AdvancedNapping #StrategicNapping #TerritoryExpansion`,
    image: '/seno-cat.jpg',
    timestamp: '2 hours ago',
    endorsements: 847,
    escalations: 203,
    comments: [
      {
        id: 'c-1-1',
        authorId: 'friend-avani',
        authorName: 'Avani Kabra',
        authorTitle: 'Chief Correctness Officer',
        content: 'The armrest transition was inevitable and I said so two weeks ago. The data was all there.',
        timestamp: '1 hour ago',
        likes: 112,
      },
      {
        id: 'c-1-2',
        authorId: 'friend-big-t',
        authorName: 'Big T',
        authorTitle: 'Chronically Online',
        content: 'sigma nap grindset no cap fr fr 🙏',
        timestamp: '45 minutes ago',
        likes: 334,
      },
      {
        id: 'c-1-3',
        authorId: 'friend-dih',
        authorName: 'Dih',
        authorTitle: 'Chill Specialist',
        content: 'the 2:47pm sun patch really said punctuality',
        timestamp: '20 minutes ago',
        likes: 4821,
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

#StrategicRelocation #BlanketRelocation #ThermalAssetManagement #ExecutiveDecision`,
    image: 'https://placecats.com/402/301',
    timestamp: '4 hours ago',
    endorsements: 1203,
    escalations: 445,
    comments: [
      {
        id: 'c-2-1',
        authorId: 'friend-pringle',
        authorName: 'Pringle Ghatiya',
        authorTitle: 'Always On Time (Except To Hackathons)',
        content: 'Bold move. I would have called a meeting first. But the execution is undeniable.',
        timestamp: '3 hours ago',
        likes: 178,
      },
      {
        id: 'c-2-2',
        authorId: 'friend-evie',
        authorName: 'Evie Graham',
        authorTitle: 'Head of Emotional Support',
        content: 'The "I remain open to dialogue but not to moving" part?? I felt that in my soul 🥺',
        timestamp: '2 hours ago',
        likes: 892,
      },
    ],
  },
  {
    id: 'post-3',
    authorId: 'cat-4',
    author: seedCats[3],
    content: `I've been quietly building something incredible for the past six months.

Today I'm proud to announce 100% fence coverage by 9:47am — a full 13 minutes ahead of quarterly forecast. The data doesn't lie. The birds know. The squirrels are deeply concerned.

I have assembled a cross-functional team (myself) to evaluate next steps. The pipeline is strong.

#FenceLineDispute #TerritoryExpansion #EarlyMover #StrategicYearning`,
    timestamp: '6 hours ago',
    endorsements: 562,
    escalations: 98,
    comments: [
      {
        id: 'c-3-1',
        authorId: 'friend-yuvi',
        authorName: 'Yuvi Goel',
        authorTitle: 'Chief Aura Officer',
        content: 'the fence coverage metrics are giving. nonchalant execution.',
        timestamp: '5 hours ago',
        likes: 203,
      },
      {
        id: 'c-3-2',
        authorId: 'friend-dih',
        authorName: 'Dih',
        authorTitle: 'Chill Specialist',
        content: 'the squirrels are cooked',
        timestamp: '4 hours ago',
        likes: 6203,
      },
    ],
  },
  {
    id: 'post-4',
    authorId: 'cat-6',
    author: seedCats[5],
    content: `Sharing a professional milestone: I have successfully colonized a new lap this morning. Total onboarding time: 11 minutes.

The candidate initially seemed non-committal (they were on a deadline) but I persisted with a structured sit-and-spin approach followed by sustained eye contact. The laptop has been relocated to the floor.

Pipeline looking strong. Multiple laps identified for Q4.

#LapRelations #LapAcquisition #TerritoryAcquisition #CloseRateImprovement`,
    image: 'https://placecats.com/401/300',
    timestamp: '8 hours ago',
    endorsements: 2847,
    escalations: 672,
    comments: [
      {
        id: 'c-4-1',
        authorId: 'friend-manahil',
        authorName: 'Manahil Sabeeh',
        authorTitle: 'Full Stack Developer',
        content: 'I was the deadline. I was not on the deadline for long. No notes.',
        timestamp: '7 hours ago',
        likes: 1567,
      },
      {
        id: 'c-4-2',
        authorId: 'friend-gabby',
        authorName: 'Gabby',
        authorTitle: 'Senior Baddie',
        content: 'the sit-and-spin close is elite behavior',
        timestamp: '6 hours ago',
        likes: 2103,
      },
    ],
  },
  {
    id: 'post-5',
    authorId: 'cat-5',
    author: seedCats[4],
    content: `Closing out the week with 2,000 consecutive hours of nap output. The metrics speak for themselves.

The sunbeam arrives at 2:47pm daily. I have leveraged this aggressively and without apology. My pillow has been exceptional. I have no plans to reduce nap throughput in Q1.

The roadmap is clear. The pillow is warm. We move forward.

#AdvancedNapping #StrategicNapping #PerformanceMetrics #Grindset`,
    timestamp: '1 day ago',
    endorsements: 4203,
    escalations: 1021,
    comments: [
      {
        id: 'c-5-1',
        authorId: 'friend-ishan',
        authorName: 'Ishan Shah',
        authorTitle: 'VP of Eventual Responses',
        content: 'respect. async operations only.',
        timestamp: '23 hours ago (sent 4 days later)',
        likes: 334,
      },
      {
        id: 'c-5-2',
        authorId: 'friend-shriya',
        authorName: 'Shriya Shukla',
        authorTitle: 'West Coast Dance Lead · California Division',
        content: 'the 2:47pm sunbeam is doing so much for this community 💃 I can feel it from California',
        timestamp: '21 hours ago',
        likes: 891,
      },
      {
        id: 'c-5-3',
        authorId: 'friend-dih',
        authorName: 'Dih',
        authorTitle: 'Chill Specialist',
        content: '2000 hours of napping is just being a cat',
        timestamp: '18 hours ago',
        likes: 8847,
      },
    ],
  },
  {
    id: 'post-5b',
    authorId: 'cat-2',
    author: seedCats[1],
    content: `I want to address something professionally and without emotion.

It has come to my attention that certain parties — who I will not name (CEO Biscuit) — have been occupying the primary sun patch without prior notice, treaty amendment, or basic courtesy. I am not angry. I am disappointed. There is a legal distinction.

A formal grievance has been filed with my internal compliance team (myself, sitting very upright). I expect a response by end of business today. After 4pm I will be napping but the grievance remains open.

This is a professional platform and I am conducting myself accordingly.

#WindowsillDiplomacy #SunPatchAlliance #FormalGrievance`,
    image: 'https://placecats.com/404/300',
    timestamp: '3 hours ago',
    endorsements: 3847,
    escalations: 2910,
    comments: [
      {
        id: 'c-5b-1',
        authorId: 'cat-3',
        authorName: 'CEO Biscuit',
        authorTitle: 'Executive Blanket Relocator · Strategic Asset Manager',
        content: 'I appreciate you raising this professionally. My presence in the sun patch was fully within the agreed parameters of the Informal Couch Summit held last Tuesday. I have the receipts. They are physical receipts (a hair I left there). You are welcome.',
        timestamp: '3 hours ago',
        likes: 892,
      },
      {
        id: 'c-5b-2',
        authorId: 'cat-2',
        authorName: 'VP Fluffington',
        authorTitle: 'Senior Treaty Negotiator · Peace Accord Architect',
        content: 'The Informal Couch Summit was not legally binding. I was there. I have reviewed the documentation (my memory). A hair does not constitute territorial claim under any framework I recognize.',
        timestamp: '2 hours 58 minutes ago',
        likes: 1203,
      },
      {
        id: 'c-5b-3',
        authorId: 'cat-3',
        authorName: 'CEO Biscuit',
        authorTitle: 'Executive Blanket Relocator · Strategic Asset Manager',
        content: 'A hair is precedent. A hair is legacy. A HAIR IS THE LAW. I cannot believe I have to explain this.',
        timestamp: '2 hours 55 minutes ago',
        likes: 6721,
      },
      {
        id: 'c-5b-4',
        authorId: 'cat-2',
        authorName: 'VP Fluffington',
        authorTitle: 'Senior Treaty Negotiator · Peace Accord Architect',
        content: 'I see we are done with the professional portion of this exchange.',
        timestamp: '2 hours 53 minutes ago',
        likes: 9034,
      },
      {
        id: 'c-5b-5',
        authorId: 'cat-3',
        authorName: 'CEO Biscuit',
        authorTitle: 'Executive Blanket Relocator · Strategic Asset Manager',
        content: 'YOU MOVED THE BLANKET IN 2022. WE ALL REMEMBER.',
        timestamp: '2 hours 51 minutes ago',
        likes: 14892,
      },
      {
        id: 'c-5b-6',
        authorId: 'cat-2',
        authorName: 'VP Fluffington',
        authorTitle: 'Senior Treaty Negotiator · Peace Accord Architect',
        content: 'That was a STRATEGIC ASSET REALLOCATION and it was ANNOUNCED via meow. There was a meow. Several witnesses.',
        timestamp: '2 hours 50 minutes ago',
        likes: 18203,
      },
      {
        id: 'c-5b-7',
        authorId: 'friend-dih',
        authorName: 'Dih',
        authorTitle: 'Chill Specialist',
        content: 'I\'m watching this live. I\'m not intervening. I\'m just watching.',
        timestamp: '2 hours 48 minutes ago',
        likes: 47291,
      },
      {
        id: 'c-5b-8',
        authorId: 'friend-avani',
        authorName: 'Avani Kabra',
        authorTitle: 'Chief Correctness Officer',
        content: 'I flagged the legal ambiguity of the Informal Couch Summit at the time. Both of you owe me a consultation fee. I have the timestamps.',
        timestamp: '2 hours 45 minutes ago',
        likes: 3847,
      },
      {
        id: 'c-5b-9',
        authorId: 'friend-hema',
        authorName: 'Hema Dassani',
        authorTitle: 'Accidental Intelligence Lead',
        content: 'wait are they okay?? also I think the hair Biscuit is referencing might actually be mine... should I not have said that 😬',
        timestamp: '2 hours 40 minutes ago',
        likes: 22034,
      },
    ],
  },
  {
    id: 'post-6',
    authorId: 'cat-2',
    author: seedCats[1],
    content: `Grateful to announce that the Southeastern Windowsill Peace Accord has entered its 72nd hour without incident.

Both parties have agreed to a shared bird-watching framework pending further review. I consider this a historic achievement in collaborative disruption.

To those who said this level of diplomacy was impossible: I invite you to review the current treaty documentation (a light headbutt of acknowledgment).

#TreatyViolation #WindowsillDiplomacy #CollaborativeDisruption`,
    timestamp: '1 day ago',
    endorsements: 1876,
    escalations: 334,
    comments: [
      {
        id: 'c-6-1',
        authorId: 'friend-avani',
        authorName: 'Avani Kabra',
        authorTitle: 'Chief Correctness Officer',
        content: 'I flagged the treaty instability in week one. The headbutt clause was always a risk. I remain available for consultation.',
        timestamp: '22 hours ago',
        likes: 445,
      },
      {
        id: 'c-6-2',
        authorId: 'friend-hema',
        authorName: 'Hema Dassani',
        authorTitle: 'Accidental Intelligence Lead',
        content: 'wait I heard from someone that the other party has already violated the windowsill terms... oh maybe I shouldn\'t have said that 😬',
        timestamp: '20 hours ago',
        likes: 2341,
      },
    ],
  },
  {
    id: 'post-7',
    authorId: 'cat-1',
    author: seedCats[0],
    content: `At 3:14am, I delivered what I believe to be the most impactful vocal performance of Q2.

The audience (sleeping humans) initially failed to appreciate the nuance. By 3:18am, full buy-in had been achieved. By 3:20am, I had secured access to additional food resources.

This is what peak stakeholder management looks like. Rate card available upon meow.

#MidnightStrategy #MidnightVocals #VocalLeadership #StakeholderAlignment`,
    image: 'https://placecats.com/403/302',
    timestamp: '2 days ago',
    endorsements: 5621,
    escalations: 2103,
    comments: [
      {
        id: 'c-7-1',
        authorId: 'friend-big-t',
        authorName: 'Big T',
        authorTitle: 'Chronically Online',
        content: '3:14am is the sigma hour no cap. the meow-to-food pipeline is REAL fr',
        timestamp: '2 days ago',
        likes: 1203,
      },
      {
        id: 'c-7-2',
        authorId: 'friend-evie',
        authorName: 'Evie Graham',
        authorTitle: 'Head of Emotional Support',
        content: '"Full buy-in had been achieved" I am not okay 🥺 this is so powerful',
        timestamp: '2 days ago',
        likes: 2891,
      },
      {
        id: 'c-7-3',
        authorId: 'friend-dih',
        authorName: 'Dih',
        authorTitle: 'Chill Specialist',
        content: 'the rate card being "upon meow" 😭',
        timestamp: '2 days ago',
        likes: 11203,
      },
    ],
  },
  {
    id: 'post-8',
    authorId: 'cat-6',
    author: seedCats[5],
    content: `Six months ago, I knocked a full glass of water off the counter at 2am.

Today, I would do it again.

The lessons this taught me about consequence, momentum, and situational commitment are invaluable. I have become comfortable with disruption. I am the disruption. The glass did not survive. Its sacrifice was not in vain.

Hiring is open.

#ChaosLeadership #FailForward #DisruptionAsService`,
    image: 'https://placecats.com/400/310',
    timestamp: '3 days ago',
    endorsements: 8947,
    escalations: 3201,
    comments: [
      {
        id: 'c-8-1',
        authorId: 'friend-ayaan',
        authorName: 'Ayaan',
        authorTitle: 'Route Development Lead',
        content: 'bro is literally me but for fences. the unauthorized access to the counter was bold. respect.',
        timestamp: '3 days ago',
        likes: 1567,
      },
      {
        id: 'c-8-2',
        authorId: 'friend-gabby',
        authorName: 'Gabby',
        authorTitle: 'Senior Baddie',
        content: '"I am the disruption." framing of the decade.',
        timestamp: '3 days ago',
        likes: 4102,
      },
      {
        id: 'c-8-3',
        authorId: 'friend-hema',
        authorName: 'Hema Dassani',
        authorTitle: 'Accidental Intelligence Lead',
        content: 'the glass was Seno\'s good glass too I think... wait was that supposed to be public info 😬',
        timestamp: '2 days ago',
        likes: 3847,
      },
    ],
  },
  {
    id: 'post-9',
    authorId: 'cat-4',
    author: seedCats[3],
    content: `Please be advised: I have been investigating a suspicious noise situation in the hallway for the past six hours.

Preliminary findings indicate the noise was a bag of chips settling. I am not satisfied with this conclusion. The investigation will continue through the night.

All non-urgent requests should be directed to my Out of Office (currently under the bed for reasons I cannot disclose).

#DueDiligence #SuspiciousNoise #AlwaysOn`,
    timestamp: '4 days ago',
    endorsements: 3102,
    escalations: 891,
    comments: [
      {
        id: 'c-9-1',
        authorId: 'friend-yuvi',
        authorName: 'Yuvi Goel',
        authorTitle: 'Chief Aura Officer',
        content: 'the chips were innocent but the investigation methodology is immaculate. nonchalant respect.',
        timestamp: '4 days ago',
        likes: 445,
      },
      {
        id: 'c-9-2',
        authorId: 'friend-manahil',
        authorName: 'Manahil Sabeeh',
        authorTitle: 'Full Stack Developer',
        content: 'I also heard the noise. I investigated by walking backwards toward it. The chips were indeed settling. I filed a separate report.',
        timestamp: '4 days ago',
        likes: 2103,
      },
    ],
  },
  {
    id: 'post-10',
    authorId: 'cat-2',
    author: seedCats[1],
    content: `Update from the sun patch front.

After several weeks of joint occupancy, both parties have agreed this arrangement is no longer aligned with our respective strategic visions. I have taken full control of the south-facing window. The other party has been offered a settlement (the bathroom floor). He has not yet responded.

This is not personal. It is territorial.

#TerritoryManagement #SunPatchAlliance #Escalating`,
    timestamp: '5 days ago',
    endorsements: 2744,
    escalations: 1203,
    comments: [
      {
        id: 'c-10-1',
        authorId: 'friend-avani',
        authorName: 'Avani Kabra',
        authorTitle: 'Chief Correctness Officer',
        content: 'The bathroom floor is not standard market rate for a sun patch of this caliber. I said this would happen. I have the timestamps.',
        timestamp: '5 days ago',
        likes: 667,
      },
      {
        id: 'c-10-2',
        authorId: 'friend-shriya',
        authorName: 'Shriya Shukla',
        authorTitle: 'West Coast Dance Lead · California Division',
        content: 'the south-facing window has main character energy and we all knew it 💃 Avani was RIGHT',
        timestamp: '5 days ago',
        likes: 1203,
      },
      {
        id: 'c-10-3',
        authorId: 'friend-dih',
        authorName: 'Dih',
        authorTitle: 'Chill Specialist',
        content: 'bathroom floor settlement is crazy 💀',
        timestamp: '5 days ago',
        likes: 9102,
      },
    ],
  },
]
