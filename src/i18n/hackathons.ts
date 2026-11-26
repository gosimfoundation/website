import type { Lang } from './ui';

interface Hackathon {
  url: string;
  en: { title: string; summary: string };
  zh: { title: string; summary: string };
}

export const hackathonsByEvent: Partial<Record<string, Hackathon[]>> = {
  'shenzhen-2026': [
    {
      url: 'https://create.gosim.org/factory26/',
      en: { title: 'Agentic Software Factory', summary: 'Teams built and tested the tools that guide AI coding agents, from an online qualifier through the live Demo Day.' },
      zh: { title: '智能体软件工厂', summary: '从线上初赛到现场演示日，团队开发并测试用于引导 AI 编程智能体的工具。' },
    },
    {
      url: 'https://create.gosim.org/survey26/',
      en: { title: 'Agentic Observer', summary: 'Teams built observing agents that decided where to point a telescope next based on changing conditions in the sky.' },
      zh: { title: '巡天智能体', summary: '团队构建观测智能体，根据不断变化的天空状况决定望远镜的下一个观测目标。' },
    },
    {
      url: 'https://create.gosim.org/agenticapp26/',
      en: { title: 'Agentic App', summary: 'Teams used OctoSense and robrix2 to build agent-powered apps for everyday tasks such as email, messaging, and calendars.' },
      zh: { title: '智能体应用', summary: '团队以 OctoSense 和 robrix2 为基础，围绕邮件、消息和日程等日常场景开发智能体应用。' },
    },
    {
      url: 'https://doracc.com/items/adora-nano-hackathon/index.html',
      en: { title: 'Mobile Robot Agent', summary: 'Teams programmed an ADORA NANO robot for industrial inspection tasks such as navigation, meter reading, and valve operation.' },
      zh: { title: '移动机器人智能体', summary: '团队为 ADORA NANO 机器人编写工业巡检程序，完成导航、仪表读数和阀门操作等任务。' },
    },
    {
      url: 'https://doracc.com/items/gosim-sim-hackathon/index.html',
      en: { title: 'Embodied AI Simulation', summary: 'Teams used reinforcement learning to train robot locomotion and tested their designs on flat, uneven, and hidden courses.' },
      zh: { title: '具身智能仿真', summary: '团队用强化学习训练机器人的运动策略，并在平地、复杂地形和隐藏赛道上进行测试。' },
    },
  ],
  'paris-2026': [
    {
      url: 'https://luma.com/6wdrnx9j',
      en: { title: 'GOSIM Agentic Hackathon', summary: 'At STATION F, teams prototyped applications built around AI agents.' },
      zh: { title: 'GOSIM 智能体黑客松', summary: '参赛团队在 STATION F 动手开发基于 AI 智能体的应用原型。' },
    },
    {
      url: 'https://paris2026.gosim.org/unaite-hackathon/',
      en: { title: 'Robotics Hackathon', summary: 'The OpenArm challenge put teams to work on grasping and manipulation using open-source robotic arms.' },
      zh: { title: '机器人黑客松', summary: 'OpenArm 挑战让团队在开源机械臂上练习抓取和物体操作。' },
    },
  ],
  'hangzhou-2025': [
    {
      url: 'https://mofa.ai/super-agent-hackathon/',
      en: { title: 'Super Agent Campathon', summary: 'An online training camp on personalized, on-device AI agents culminated in live demos and judging in Hangzhou.' },
      zh: { title: '超级智能体训练营与黑客松', summary: '参赛者在线学习如何构建个性化端侧智能体，并在杭州现场演示和接受评审。' },
    },
    {
      url: 'https://hackathon.mofa.ai/',
      en: { title: 'Code Alert AI Hackathon', summary: 'Developers built agents that translated natural-language commands into Red Alert game actions, then pushed their agents through live final battles.' },
      zh: { title: 'Code Alert AI 黑客松', summary: '开发者构建能将自然语言指令转化为《红色警戒》游戏操作的智能体，并在现场决赛中对战。' },
    },
  ],
  'paris-2025': [
    {
      url: 'https://luma.com/7djaix39',
      en: { title: 'Seeed Embodied AI Hackathon', summary: 'The challenge featured Hugging Face’s LeRobot framework and the SO-ARM100 arm for hands-on work with imitation learning.' },
      zh: { title: 'Seeed 具身智能黑客松', summary: '参赛者使用 Hugging Face 的 LeRobot 框架和 SO-ARM100 机械臂，动手探索模仿学习。' },
    },
  ],
  'beijing-2024': [
    {
      url: 'https://china2024.gosim.org/schedules/gosim-keynote-hackathon-winner-announcement.html',
      en: { title: 'GOSIM Hackathon Awards', summary: 'The October 17 opening plenary included the hackathon awards ceremony.' },
      zh: { title: 'GOSIM 黑客松颁奖', summary: '10 月 17 日的大会开幕全体会议安排了黑客松颁奖环节。' },
    },
  ],
};

export const hackathonCopy = {
  en: {
    title: 'Hackathon highlights',
    intro: 'Revisit the challenges developers took on alongside GOSIM conferences, from building AI agents at STATION F to testing robots in Shenzhen.',
    portal: 'Visit GOSIM Create',
    event: 'See the event highlight',
    photo: 'Teams work on their projects at GOSIM Shenzhen 2026.',
    photoCredit: 'GOSIM Shenzhen 2026',
    explore: 'Explore the challenges',
    archive: 'Past editions',
    parisPhoto: 'Two attendees work at a laptop beside a robotic arm at GOSIM Paris 2026.',
    challengeCount: (count: number) => count === 1 ? '1 challenge' : `${count} challenges`,
  },
  zh: {
    title: '黑客松回顾',
    intro: '从巴黎 STATION F 的智能体应用，到深圳的机器人测试，回顾开发者在 GOSIM 大会同期参与的挑战。',
    portal: '访问 GOSIM Create',
    event: '查看大会回顾',
    photo: '参赛团队在 GOSIM 深圳 2026 黑客松现场开发项目。',
    photoCredit: 'GOSIM 深圳 2026',
    explore: '浏览黑客松挑战',
    archive: '往届回顾',
    parisPhoto: 'GOSIM 巴黎 2026 现场，两位参会者在机械臂旁一起调试笔记本电脑。',
    challengeCount: (count: number) => `${count} 项挑战`,
  },
} satisfies Record<Lang, {
  title: string;
  intro: string;
  portal: string;
  event: string;
  photo: string;
  photoCredit: string;
  explore: string;
  archive: string;
  parisPhoto: string;
  challengeCount: (count: number) => string;
}>;
