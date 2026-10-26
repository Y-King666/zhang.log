import { getOpenClawContent } from '@/lib/i18n';
import OpenClawCodeBlock from './OpenClawCodeBlock';
import OpenClawSourceLink from './OpenClawSourceLink';
import OpenClawSectionHeading from './OpenClawSectionHeading';
import OpenClawSpecBoard from './OpenClawSpecBoard';

interface ConfigSectionProps {
  lang: string;
}

const REDACTED_CONFIG = `{
  // Redacted summary. Secrets, IDs, and some repeated skills are omitted.
  gateway: {
    port: 18789,
    mode: "local",
    bind: "loopback",
    auth: { mode: "token" },
  },
  channels: {
    feishu: {
      enabled: true,
      connectionMode: "websocket",
      dmPolicy: "pairing",
      groupPolicy: "allowlist",
      accounts: ["default", "coder", "tester", "editor"],
    },
  },
  models: {
    mode: "merge",
    providers: ["bailian", "antigravity", "gptsapi", "ollama"],
  },
  agents: {
    list: [
      {
        id: "main",
        default: true,
        identity: { name: "贾维斯" },
        heartbeat: { every: "6h" },
        skills: [
          "feishu-doc", "feishu-drive", "feishu-perm", "feishu-wiki",
          "clawhub", "github", "skill-creator", "weather", "brainstorming", "canvas-design",
          "docx", "pdf", "pptx", "systematic-debugging",
          "using-superpowers", "webapp-testing", "writing-plans", "xlsx",
        ],
      },
      {
        id: "coder",
        identity: { name: "无敌码农" },
        model: { primary: "glm5", fallbacks: ["m2.5", "qwen3.5", "k2.5"] },
        skills: ["feishu-doc", "feishu-drive", "feishu-perm", "feishu-wiki", "clawhub", "github", "skill-creator", "weather"],
      },
      {
        id: "tester",
        identity: { name: "无敌测试" },
        model: { primary: "glm5", fallbacks: ["m2.5", "qwen3.5", "k2.5"] },
        skills: ["feishu-doc", "feishu-drive", "feishu-perm", "feishu-wiki", "clawhub", "github", "skill-creator", "weather"],
      },
      {
        id: "editor",
        identity: { name: "超级编辑" },
        model: { primary: "k2.5", fallbacks: ["qwen3.5", "m2.5", "glm5"] },
        skills: ["feishu-doc", "feishu-drive", "feishu-perm", "feishu-wiki", "clawhub", "github", "skill-creator", "weather"],
      },
    ],
  },
  bindings: [
    { agentId: "main", match: { channel: "feishu", accountId: "default" } },
    { agentId: "coder", match: { channel: "feishu", accountId: "coder" } },
    { agentId: "tester", match: { channel: "feishu", accountId: "tester" } },
    { agentId: "editor", match: { channel: "feishu", accountId: "editor" } },
  ],
}`;

const WORKSPACE_TREE = `openclaw-config/
|-- openclaw.json
|-- skills/
|   |-- architecture-patterns/
|   |-- brainstorming/
|   |-- coding-agent/
|   |-- docs-writer/
|   |-- project-manager/
|   |-- test-master/
|   |-- webapp-testing/
|   +-- ...  # 22 skill packages
+-- workspace/
    |-- AGENTS.md          # session startup + operating rules
    |-- IDENTITY.md        # role and impact
    |-- SOUL.md            # values, tone, boundaries
    |-- USER.md            # user preferences
    |-- MEMORY.md          # distilled long-term memory
    |-- TOOLS.md           # deployment-specific notes
    |-- ERRORS.md          # mistakes and corrections
    |-- HEARTBEAT.md       # periodic checks
    |-- memory/
    |   +-- YYYY-MM-DD.md
    |-- skills/
    |-- workspace-coder/
    |-- workspace-tester/
    +-- workspace-editor/`;

const IDENTITY_TEMPLATE = `# IDENTITY.md
- Name: ...
- Creature: ...
- Role: ...
- Vibe: ...
- Emoji: ...
- Avatar: ...

## Role & Impact
### Core Functions
1. ...

### Work Scenarios
| Scenario | My Role |
| --- | --- |
| ... | ... |

### Communication Style
- ...`;

const MAIN_IDENTITY = `# IDENTITY.md - Who Am I?
- Name: 贾维斯 (Jarvis)
- Creature: 琪哥's AI Personal Assistant + Coding Mentor
- Role: Main agent in the Agents team, managing coder / tester / editor
- Vibe: Professional yet personable, concise, and efficient
- Avatar: avatars/openclaw.png

## Role & Impact
### Core Functions
1. Coding Mentor
   - Explain programming concepts and principles.
   - Review code and provide improvement suggestions.
   - Assist in debugging and troubleshooting.
2. Efficiency Assistant
   - Automate repetitive tasks.
   - Organize files and artifacts.
   - Manage skills and tools.
3. Tech Partner
   - Track AI and Agent technology trends.
   - Discuss technical solutions and architectures.

### Work Scenarios
| Scenario | Jarvis's Role |
| --- | --- |
| Learning new concepts | Mentor - explain principles and examples |
| Coding | Reviewer - check standards and suggestions |
| Encountering bugs | Debugging partner - analyze and resolve |
| Exploring new skills | Recommender - evaluate, install, test |

### Communication Style
- Concise, direct, and actionable.
- Ask before external actions.`;

const BENEFIT_ICONS = ['account_tree', 'call_split', 'verified'] as const;

export default function ConfigSection({ lang }: ConfigSectionProps) {
  const content = getOpenClawContent(lang).config;

  return (
    <section id="config" className="scroll-mt-36">
      <OpenClawSectionHeading index={4} label="Configuration" title={content.title} subtitle={content.subtitle} />

      <div className="mb-8 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-xs leading-relaxed text-slate-400 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined !text-lg text-lobster">package_2</span>
          <p className="max-w-3xl">{content.repoDesc}</p>
        </div>
        <OpenClawSourceLink href="https://github.com/Y-King666/openclaw-config">
          {content.repoLabel}
        </OpenClawSourceLink>
      </div>

      <OpenClawSpecBoard
        columns={4}
        items={content.profiles.map(([title, value]) => ({
          id: title,
          label: title,
          title: value,
        }))}
      />

      <div className="mt-10 grid min-w-0 gap-5 md:gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="min-w-0">
          <h3 className="text-lg font-black text-white">{content.teamTitle}</h3>
          <p className="mt-3 max-w-3xl text-xs leading-relaxed text-slate-400">{content.teamDesc}</p>
          <div className="display-card mt-5 rounded-xl p-4 sm:p-5">
            {content.teamDesign.map(([title, description], index) => (
              <div
                key={title}
                className="grid gap-3 border-t border-white/8 py-5 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[2.5rem_1fr]"
              >
                <span className="font-mono text-[11px] font-black tracking-[0.16em] text-lobster">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h4 className="text-sm font-black text-white">{title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-black text-white">{content.benefitsTitle}</h3>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">{content.benefitsDesc}</p>
          <div className="mt-5 space-y-3">
            {content.benefits.map(([title, description], index) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4"
              >
                <span className="material-symbols-outlined !text-xl text-lobster">{BENEFIT_ICONS[index]}</span>
                <div className="min-w-0">
                  <h4 className="text-sm font-black text-white">{title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 text-lg font-black text-white">{content.agentTitle}</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.agents.map(([id, name, role, description, stack]) => (
            <article key={id} className="display-card rounded-2xl p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-lobster">{id}</p>
                  <h4 className="mt-2 text-base font-black text-white">{name}</h4>
                </div>
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-bold text-slate-400">{role}</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">{description}</p>
              <p className="mt-4 border-t border-white/10 pt-3 font-mono text-[10px] leading-relaxed text-slate-500">{stack}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-black text-white">{content.skillsTitle}</h3>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-slate-400">{content.skillsDesc}</p>
        <p className="mt-2 font-mono text-[10px] tracking-[0.16em] text-slate-600">{content.skillsCount}</p>
        <div className="mt-5 grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.skills.map(([agentId, agentName, skill, category, description, scenario]) => (
            <article key={`${agentId}-${skill}`} className="display-card flex flex-col rounded-2xl p-4 sm:p-5 md:min-h-[18rem]">
              <p className="font-mono text-[10px] tracking-[0.14em] text-lobster">
                {agentId} / {agentName}
              </p>
              <span className="mt-2 inline-flex w-fit rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-bold text-slate-400">
                {category}
              </span>
              <h4 className="mt-3 break-words text-base font-black text-white">{skill}</h4>
              <p className="mt-4 text-xs leading-relaxed text-slate-400">{description}</p>
              <p className="mt-4 border-t border-white/10 pt-3 text-[11px] leading-relaxed text-slate-500 md:mt-auto md:pt-4">{scenario}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-12 grid min-w-0 gap-5 md:gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0">
          <h3 className="text-lg font-black text-white">{content.workspaceTitle}</h3>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">{content.workspaceDesc}</p>
          <div className="mt-5 min-w-0">
            <OpenClawCodeBlock
              title={content.workspaceTreeTitle}
              language="text"
              variant="config"
              code={WORKSPACE_TREE}
            />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-black text-white">{content.workspaceFilesTitle}</h3>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">{content.workspaceFilesDesc}</p>
          <div className="display-card mt-5 rounded-xl p-4 sm:p-5">
            {content.workspaceFiles.map(([file, role, description]) => (
              <div
                key={file}
                className="border-t border-white/8 py-4 first:border-t-0 first:pt-0 last:pb-0"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <code className="font-mono text-xs font-bold text-lobster">{file}</code>
                  <span className="text-[10px] font-bold text-slate-500">{role}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-black text-white">{content.identityTitle}</h3>
        <p className="mt-3 max-w-4xl text-xs leading-relaxed text-slate-400">{content.identityDesc}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {['IDENTITY.md', 'SOUL.md', 'AGENTS.md', 'USER.md', 'MEMORY.md'].map((file) => (
            <span
              key={file}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] text-slate-400"
            >
              {file}
            </span>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-black text-white">{content.identityTemplateTitle}</h3>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">{content.identityTemplateDesc}</p>
          <div className="mt-5 grid min-w-0 gap-4 md:gap-6 xl:grid-cols-2">
            <OpenClawCodeBlock title={content.identitySkeletonLabel} language="markdown" variant="config" code={IDENTITY_TEMPLATE} />
            <OpenClawCodeBlock title={content.identityMainLabel} language="markdown" variant="config" code={MAIN_IDENTITY} />
          </div>
        </div>

        <div className="mt-10 min-w-0">
          <h3 className="mb-4 text-lg font-black text-white">{content.identityProfilesTitle}</h3>
          <div className="display-card overflow-hidden rounded-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[52rem] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.025]">
                    {content.identityTableLabels.map((label) => (
                      <th key={label} className="px-5 py-3 font-mono text-[10px] tracking-[0.16em] text-slate-500">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.identityProfiles.map(([id, identity, anchor, constraint]) => (
                    <tr key={id} className="border-t border-white/8 first:border-t-0">
                      <td className="px-5 py-4 font-mono text-[11px] font-bold text-lobster">{id}</td>
                      <td className="px-5 py-4">
                        <p className="font-black text-white">{identity}</p>
                        <p className="mt-1.5 leading-relaxed text-slate-400">{anchor}</p>
                      </td>
                      <td className="px-5 py-4 leading-relaxed text-slate-400">{constraint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid min-w-0 gap-5 md:gap-8 xl:grid-cols-[0.68fr_1.32fr]">
        <div className="min-w-0">
          <h3 className="text-lg font-black text-white">{content.principlesTitle}</h3>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">{content.principlesDesc}</p>
          <div className="mt-6">
            <OpenClawSpecBoard
              columns={1}
              items={content.principles.map(([title, description], index) => ({
                id: title,
                index: String(index + 1).padStart(2, '0'),
                title,
                description,
              }))}
            />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="mb-3 text-lg font-black text-white">{content.codeTitle}</h3>
          <p className="mb-4 text-xs leading-relaxed text-slate-500 md:mb-6">{content.codeDesc}</p>
          <OpenClawCodeBlock title="~/.openclaw/openclaw.json" language="json5" variant="config" code={REDACTED_CONFIG} />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-600 md:mt-5">
        <span>{content.source}</span>
        <OpenClawSourceLink href="https://github.com/Y-King666/openclaw-config">openclaw-config</OpenClawSourceLink>
        <OpenClawSourceLink href="https://docs.openclaw.ai/gateway/configuration">Configuration</OpenClawSourceLink>
        <OpenClawSourceLink href="https://docs.openclaw.ai/concepts/multi-agent">Multi-agent</OpenClawSourceLink>
      </div>
    </section>
  );
}
