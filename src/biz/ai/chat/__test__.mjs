import chatAi from './index.mjs';

export function impactExplainPrompt({ summary, changedFiles }) {
  return [
    {
      role: 'system',
      content: `
你是一个资深前端架构师，擅长代码影响分析。
只基于提供的上下文回答，不要臆测。
`,
    },
    {
      role: 'user',
      content: `
以下是本次变更的影响分析结果：

变更文件：
${changedFiles.join('\n')}

影响摘要：
${summary}

请用简洁、结构化的方式说明：
1. 核心影响模块
2. 风险点
3. 建议关注点
`,
    },
  ];
}

// const chatAi = new ChatAi();
chatAi.messages = impactExplainPrompt({
  summary: '新增了一个路由',
  changedFiles: [
    {
      file: 'D://OpenSource/react-playground/src/components/advanced-search/index.jsx',
      inDegree: 0,
      outDegree: 5,
      hubScore: 5,
    },
    {
      file: 'D://OpenSource/react-playground/src/components/advanced-search/action/validator/index.js',
      inDegree: 1,
      outDegree: 2,
      hubScore: 4,
    },
    {
      file: 'D://OpenSource/react-playground/src/components/advanced-search/constant.js',
      inDegree: 2,
      outDegree: 0,
      hubScore: 4,
    },
    {
      file: 'D://OpenSource/react-playground/src/components/advanced-search/action/tree-data-reducer.js',
      inDegree: 1,
      outDegree: 1,
      hubScore: 3,
    },
    {
      file: 'D://OpenSource/react-playground/src/components/advanced-search/action/validator-reducer.js',
      inDegree: 1,
      outDegree: 1,
      hubScore: 3,
    },
    {
      file: 'D://OpenSource/react-playground/src/components/advanced-search/action/tree-data/index.js',
      inDegree: 1,
      outDegree: 0,
      hubScore: 2,
    },
    {
      file: 'D://OpenSource/react-playground/src/components/advanced-search/context/tree-data.js',
      inDegree: 1,
      outDegree: 0,
      hubScore: 2,
    },
    {
      file: 'D://OpenSource/react-playground/src/components/advanced-search/context/validator.js',
      inDegree: 1,
      outDegree: 0,
      hubScore: 2,
    },
    {
      file: 'D://OpenSource/react-playground/src/components/advanced-search/action/validator/validator-tool.js',
      inDegree: 1,
      outDegree: 0,
      hubScore: 2,
    },
  ],
});

chatAi.chat().then(console.log);

// 输出结果
// [
//   {
//     message: {
//       role: 'assistant',
//       content: '**变更影响分析报告**\n' +
//         '\n' +
//         '1. **核心影响模块**  \n' +
//         '   - 路由系统（Router）  \n' +
//         '   - 前端页面导航逻辑  \n' +
//         '   - 可能关联的权限控制模块（如路由守卫）\n' +
//         '\n' +
//         '2. **风险点**  \n' +
//         '   - 新增路由路径冲突或重定向错误  \n' +
//         '   - 未配置访问权限导致安全漏洞（如未授权访问）  \n' +
//         '   - 路由懒加载配置不当影响首屏性能  \n' +
//         '   - 缺少对应页面组件或组件加载失败  \n' +
//         '\n' +
//         '3. **建议关注点**  \n' +
//         '   - 检查新增路由的 `path` 是否唯一，避免覆盖现有路由  \n' +
//         '   - 确认是否已配置必要的权限校验（如 `meta.requiresAuth`）  \n' +
//         '   - 验证路由对应的页面组件能否正确加载（尤其动态导入）  \n' +
//         '   - 测试浏览器前进后退、刷新等场景下的路由行为一致性  \n' +
//         '   - 审查是否需同步更新面包屑、菜单栏等导航组件  \n' +
//         '\n' +
//         '> � 建议：结合实际路由配置代码进一步验证上述要点。'
//     },
//     finish_reason: 'stop',
//     index: 0,
//     logprobs: null
//   }
// ]
