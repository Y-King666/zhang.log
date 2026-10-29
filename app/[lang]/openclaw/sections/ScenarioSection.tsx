import ProgressiveImage from '@/components/ProgressiveImage';
import { getOpenClawContent } from '@/lib/i18n';
import OpenClawCodeBlock from './OpenClawCodeBlock';
import OpenClawSectionHeading from './OpenClawSectionHeading';

interface ScenarioSectionProps {
  lang: string;
}

const DAILY_PUSH_JOB = `{
  "id": "XXXXXXXXXXXXX",
  "agentId": "main",
  "name": "每日推送",
  "enabled": true,
  "schedule": {
    "kind": "cron",
    "expr": "0 7 * * *",
    "tz": "Asia/Shanghai"
  },
  "sessionTarget": "isolated",
  "payload": {
    "kind": "agentTurn",
    "message": "运行每日推送脚本：\`.../daily_push_cron.py\`",
    "thinking": "medium"
  },
  "delivery": {
    "mode": "announce",
    "channel": "feishu",
    "to": "oc_XXXXXXXXXXXXX",
    "bestEffort": false
  }
}`;

const DAILY_PUSH_SCRIPT = `def main():
    plan = get_today_plan()              # 读 Excel 学习计划
    weather = get_weather()              # open-meteo
    github_updates = get_github_updates()
    news_articles = get_news_articles()  # 七个源按优先级

    parts = [plan['calendar'], '', weather, '']
    if github_updates:                   # 有新发布才插入
        parts += [github_updates, '']
    parts += ["【学习任务】"]
    parts += [f"   {task}" for task in plan['tasks']]
    parts += ["", "【做题任务】", f"   {plan['homework']}", ""]

    encouragement = random.choice(ENCOURAGEMENT_MESSAGES)
    message = '\\n'.join(parts)
    send_to_feishu(message, news_articles, encouragement)


def send_to_feishu(message, news_articles, encouragement):
    token = get_feishu_tenant_access_token()
    post = {"zh_cn": {"title": "", "content": []}}

    for line in message.split('\\n'):      # 正文按行切成段落
        post["zh_cn"]["content"].append(
            [{"tag": "text", "text": line}])

    for article in news_articles:         # 新闻标题转成链接
        post["zh_cn"]["content"].append([
            {"tag": "a", "text": article['title'][:50],
             "href": article['url']}])

    # 其余为 HTTP 请求、返回码判断与错误日志`;

export default function ScenarioSection({ lang }: ScenarioSectionProps) {
  const content = getOpenClawContent(lang).scenarios;

  return (
    <section id="scenarios" className="scroll-mt-36">
      <OpenClawSectionHeading index={6} label="Scenarios" title={content.title} subtitle={content.subtitle} />

      <div>
        <h3 className="text-lg font-medium text-paper">{content.pushTitle}</h3>
        <p className="mt-3 max-w-4xl text-xs leading-6 text-fog">{content.pushDesc}</p>

        <div className="mt-6 grid min-w-0 gap-6 md:gap-8 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
          <figure className="min-w-0">
            <a
              href="/images/openclaw/feishu-daily-push-full.jpg"
              target="_blank"
              rel="noreferrer"
              className="block w-full max-w-[330px] overflow-hidden border border-rule bg-surface transition-colors hover:border-fog focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper"
            >
              <ProgressiveImage
                src="/images/openclaw/feishu-daily-push-full.jpg"
                alt={content.pushShotAlt}
                width={1182}
                height={3548}
                className="h-auto w-full"
                sizes="300px"
              />
            </a>
            <figcaption className="mt-3 max-w-[330px] text-[11px] leading-5 text-fog">{content.pushShotCaption}</figcaption>
          </figure>

          <div className="min-w-0 space-y-5">
            <OpenClawCodeBlock title={content.pushJobTitle} language="json" variant="config" code={DAILY_PUSH_JOB} />
            <OpenClawCodeBlock title={content.pushScriptTitle} language="python" variant="config" code={DAILY_PUSH_SCRIPT} />
            <p className="text-[11px] leading-5 text-fog">{content.pushNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
