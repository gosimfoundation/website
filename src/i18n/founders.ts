/**
 * Bilingual founders content. Locale-independent bits (image, accent, link URL
 * and its label) live at the top level; name / role / bio are per-locale.
 * Content ported from GOSIM.org's #founders section.
 */
export const foundersPage = {
  en: {
    eyebrow: '// Founders',
    heading: 'Our founders',
    intro: 'The people who started GOSIM — to foster open-source collaboration across culture and language barriers.',
  },
  zh: {
    eyebrow: '// 创始人',
    heading: '我们的创始人',
    intro: '创立 GOSIM 的专家——致力于促进跨越文化与语言障碍的开源协作。',
  },
} as const;

export const founders = [
  {
    image: '/founders/m-yuan.jpeg',
    accent: 'var(--color-teal)',
    link: 'https://github.com/WasmEdge/WasmEdge',
    linkLabel: 'WasmEdge Runtime',
    en: {
      name: 'Michael Yuan',
      role: 'Co-founder',
      bio: [
        'Dr. Michael Yuan is an American entrepreneur and venture investor. He started and exited 3 software companies, and served as a board director for over 10 companies. Michael is the founder and maintainer of the Linux Foundation’s open-source project, WasmEdge Runtime. He is also the author of 6 books on software engineering published by Prentice Hall, Addison-Wesley, O’Reilly, and Manning — his latest is Manning’s “Open source LLMs on your own computer.”',
        'In 2022, he co-founded the GOSIM community and its series of conferences, based in Singapore, to foster open-source collaboration across culture and language barriers.',
        'Michael received a PhD in Astrophysics from the University of Texas at Austin. He lives in Austin with his family.',
      ],
    },
    zh: {
      name: 'Michael Yuan',
      role: '联合创始人',
      bio: [
        'Michael Yuan 博士是美国企业家与风险投资人。他创立并成功退出 3 家软件公司，并在 10 多家公司担任董事。Michael 是 Linux 基金会开源项目 WasmEdge Runtime 的创建者与维护者，也是 6 本软件工程著作的作者，由 Prentice Hall、Addison-Wesley、O’Reilly 与 Manning 出版——最新著作是 Manning 的《Open source LLMs on your own computer》。',
        '2022 年，他共同创立了 GOSIM 社区及其系列大会（总部位于新加坡），旨在促进跨越文化与语言障碍的开源协作。',
        'Michael 拥有德克萨斯大学奥斯汀分校天体物理学博士学位，目前与家人居住在奥斯汀。',
      ],
    },
  },
  {
    image: '/founders/j-tao.png',
    accent: 'var(--color-coral)',
    link: 'https://csdn.net',
    linkLabel: 'CSDN',
    en: {
      name: 'Jiang Tao',
      role: 'Co-founder',
      bio: [
        'Mr. Jiang Tao is the Founder & Chairman of CSDN, the premier professional developers community in China. With a dynamic career spanning 30 years, he has melded expertise in software, the internet, and the entrepreneurial realm. He has led projects like the Giant Handwriting Computer, Kingsoft Ciba, and Haojie Super Software.',
        'In addition to founding CSDN, Mr. Jiang Tao also founded Programmer Magazine, ITCAST Education, and Geek Founders Ventures. As an astute investor, Jiang has strategically anchored in over 80 high-tech startups.',
        'Deeply rooted in championing software and open-source advances in China, Mr. Jiang Tao has served as an executive member of the Open Source Development Committee of the China Computer Federation, deputy secretary general of the China Computer Federation, a member of the Intelligent Application Branch of the China Software Industry Association, and executive director of the China Inventors Association.',
      ],
    },
    zh: {
      name: '蒋涛',
      role: '联合创始人',
      bio: [
        '蒋涛先生是 CSDN 的创始人兼董事长，CSDN 是中国领先的专业开发者社区。在长达 30 年的职业生涯中，他融合了软件、互联网与创业领域的专长，曾主导巨人手写电脑、金山词霸、豪杰超级解霸等项目。',
        '除 CSDN 外，蒋涛先生还创办了《程序员》杂志、传智教育与极客帮创投。作为敏锐的投资人，他已战略投资 80 多家高科技创业公司。',
        '蒋涛先生长期致力于推动中国软件与开源事业的发展，曾担任中国计算机学会开源发展委员会常务委员、中国计算机学会副秘书长、中国软件行业协会智能应用分会会员，以及中国发明协会常务理事。',
      ],
    },
  },
] as const;
