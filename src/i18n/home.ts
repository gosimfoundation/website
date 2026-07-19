/**
 * Homepage section content, per locale. Kept out of the flat `ui.ts` strings
 * because these are longer prose blocks and arrays. Non-text bits (accent
 * colors, spotlight icons, numbers) live in Home.astro and zip by index.
 *
 * Values with HTML (hero.title, nexus.heading) are rendered with `set:html`.
 */
export const homeContent = {
  en: {
    hero: {
      title: 'Global <span class="whitespace-nowrap brand-gradient">Open-Source</span> Innovation Meetup',
      subtitle:
        'GOSIM brings the open-source community together — nurturing the brightest grassroots projects across culture and language barriers, through its Conference, Workshop, and year-round Spotlight.',
      cta: 'Explore events',
    },
    nextEvent: { label: 'Next event', cta: 'Visit event site', cfp: 'Call for proposals' },
    nexus: {
      eyebrow: '// About GOSIM',
      heading: 'A global nexus for <span class="text-teal">open-source</span>',
      paras: [
        'The global tech landscape is replete with innovation, and much of its foundation rests on the ethos of open-source collaboration. GOSIM stands at the forefront — a platform dedicated to nurturing the brightest grassroots open-source projects from inception to maturity.',
        'Born from the shared vision of a global community and run entirely by volunteers, GOSIM gives innovative projects a stage to shine, collaborate, and evolve. It’s not just a platform; it’s a movement. If a project is global, grassroots, and open-source, it has found its home at GOSIM.',
      ],
      highlights: ['By and for the open-source community', 'Open, diverse, and inclusive', 'Volunteer-based'],
      foundersCta: 'Meet the founders',
    },
    pillars: {
      eyebrow: '// What we do',
      heading: 'Three pillars of GOSIM',
      items: [
        {
          title: 'GOSIM Conference',
          body: 'Held twice a year — a confluence of minds from across the open-source domain. A deep dive into technology trends, strategy, governance, and best practices.',
        },
        {
          title: 'GOSIM Workshop',
          body: 'Where the rubber meets the road. A hands-on annual event — project design, code, hackathons, and competitions for the people shaping what’s next.',
        },
        {
          title: 'GOSIM Spotlight',
          body: 'The heart of GOSIM, beating year-round. An ongoing initiative supporting open-source project development, backed by sponsorship and grants.',
        },
      ],
    },
    events: {
      eyebrow: '// Past events',
      heading: 'Conferences and workshops',
      description:
        'GOSIM conferences and workshops across Paris, Hangzhou, Shenzhen, and beyond — each with its own program, talks, and stories.',
    },
    spotlights: {
      eyebrow: '// Spotlights',
      heading: 'Inspiring the future through open creation',
      description:
        'GOSIM Spotlight is an international showcase program that highlights exceptional open-source projects and brings them to the global community — a year-round initiative that runs between the conferences.',
      benefitsLabel: 'What selected projects receive',
      benefits: [
        { title: 'Stage time', desc: 'Present your project at major GOSIM conferences worldwide.' },
        { title: 'Mentorship', desc: 'Guidance from experienced open-source leaders and maintainers.' },
        { title: 'Travel support', desc: 'Support to attend and showcase your work in person.' },
        { title: 'Networking', desc: 'Connections with industry leaders and the global community.' },
      ],
      cta: 'Explore Spotlight',
    },
  },

  zh: {
    hero: {
      title: '全球<span class="brand-gradient">开源</span>创新汇',
      subtitle: 'GOSIM 汇聚全球开源社区——通过大会、工作坊与全年的聚焦计划，培育最杰出的草根项目，跨越文化与语言的边界。',
      cta: '浏览活动',
    },
    nextEvent: { label: '下一场活动', cta: '访问活动网站', cfp: '议题征集' },
    nexus: {
      eyebrow: '// 关于 GOSIM',
      heading: '连接全球的<span class="text-teal">开源</span>枢纽',
      paras: [
        '全球科技版图充满创新，而其根基很大程度上建立在开源协作的精神之上。GOSIM 站在最前沿——一个致力于培育最杰出的草根开源项目、陪伴它们从萌芽走向成熟的平台。',
        'GOSIM 源自全球社区的共同愿景，完全由志愿者运营，为创新项目提供闪耀、协作与成长的舞台。它不只是一个平台，更是一场运动。只要项目是全球性的、草根的、开源的，就能在 GOSIM 找到归属。',
      ],
      highlights: ['由社区共建，服务社区', '开放、多元、包容', '完全志愿驱动'],
      foundersCta: '了解创始人',
    },
    pillars: {
      eyebrow: '// 我们做什么',
      heading: 'GOSIM 的三大支柱',
      items: [
        {
          title: 'GOSIM 大会',
          body: '每年举办两次——汇聚开源领域各方智慧，深入探讨技术趋势、战略、治理与最佳实践。',
        },
        {
          title: 'GOSIM 工作坊',
          body: '真刀真枪的实战现场。一年一度的动手活动——项目设计、编码、黑客松与竞赛，献给正在塑造未来的人们。',
        },
        {
          title: 'GOSIM 聚焦',
          body: 'GOSIM 全年跳动的心脏。一项持续进行的计划，通过赞助与资助支持开源项目的发展。',
        },
      ],
    },
    events: {
      eyebrow: '// 往届活动',
      heading: '大会与工作坊',
      description: 'GOSIM 大会与工作坊遍及巴黎、杭州、深圳等地——每一场都有各自的议程、演讲与故事。',
    },
    spotlights: {
      eyebrow: '// 聚焦',
      heading: '以开放创造，启迪未来',
      description:
        'GOSIM Spotlight 是一项国际展示计划，聚焦卓越的开源项目并将它们带到全球社区面前——一项在大会之间全年持续的计划。',
      benefitsLabel: '入选项目将获得',
      benefits: [
        { title: '舞台展示', desc: '在全球各大 GOSIM 大会上展示你的项目。' },
        { title: '导师指导', desc: '来自资深开源领袖与维护者的指导。' },
        { title: '差旅支持', desc: '支持你亲临现场展示自己的作品。' },
        { title: '社群连接', desc: '与行业领袖及全球社区建立联系。' },
      ],
      cta: '探索聚焦计划',
    },
  },
} as const;
