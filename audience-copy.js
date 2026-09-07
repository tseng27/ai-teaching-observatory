/* AI 教學觀察所｜觀眾版網站文字 */
(() => {
  const apply = () => {
    /* AI 工具：改成對外公開、訪客導向的語氣 */
    const tools = document.getElementById('tools');
    if (tools) {
      const eyebrow = tools.querySelector('.head .eyebrow');
      const title = tools.querySelector('.head h2');
      const intro = tools.querySelector('.head > p');

      if (eyebrow) eyebrow.textContent = 'AI TOOLS / 教學資源';
      if (title) title.textContent = '從教學目的出發，找到適合的 AI 工具';
      if (intro) intro.textContent = '依照文字、圖像、影音與 AR／VR 等應用情境，整理課堂實際使用的 AI 與數位工具，提供教師、學生與教育工作者作為教學與創作參考。';

      const toolCopy = {
        'ChatGPT': '適合課程發想、提問設計、學習單規劃、提示詞撰寫與視覺生成等教學應用。',
        'Gemini': '支援文字與圖像等多模態理解，可應用於視覺分析、資料整理、跨媒材創作與比較。',
        'Pixverse': '可將靜態圖像轉為短影片，適合快速測試動態效果、建立影片原型與課堂創作。',
        'EyeJack': '將影片或動畫疊加到平面圖像上，適合 AR 展示、互動作品與虛實整合。',
        'NotebookLM': '可依據指定資料整理重點、生成摘要、簡報草稿與學習素材，適合資料導向的教學準備。'
      };

      tools.querySelectorAll('.tool').forEach((card) => {
        const name = card.querySelector('h3')?.textContent?.trim();
        const desc = card.querySelector('p');
        if (name && desc && toolCopy[name]) desc.textContent = toolCopy[name];
      });
    }

    /* Facebook：同樣維持觀眾導向 */
    const facebook = document.getElementById('facebook');
    if (!facebook) return;

    const title = facebook.querySelector('.head h2');
    const intro = facebook.querySelector('.head > p');
    const copyTitle = facebook.querySelector('.fb-copy h3');
    const copyText = facebook.querySelector('.fb-copy > p');
    const points = facebook.querySelectorAll('.fb-point');
    const button = facebook.querySelector('.fb-copy .btn.fb');
    const fallback = facebook.querySelector('.fb-fallback');

    if (title) title.textContent = '從課堂現場，看見教學正在發生';
    if (intro) intro.textContent = '記錄每一次課堂的觀察、學生的創作與 AI 融入教學的實踐，讓藝術、科技與學習在真實教室裡持續發生。';
    if (copyTitle) copyTitle.innerHTML = '從一堂課的片刻，<br>累積成教學的足跡。';
    if (copyText) copyText.textContent = '這裡收錄 AI 教學觀察所的課堂紀錄、作品與教學反思，邀請你一起看見學生如何觀察、思考、創作，也看見科技如何成為學習的一部分。';

    const pointCopy = [
      ['最新教學紀錄','課堂現場、學生學習與教學片段的即時分享。'],
      ['課程案例','從發想到實作，閱讀完整的課程脈絡與學習歷程。'],
      ['作品與教學資源','看見學生創作，也探索課堂中使用的 AI 與數位工具。']
    ];
    points.forEach((point, index) => {
      const [heading, desc] = pointCopy[index] || [];
      const b = point.querySelector('b');
      const small = point.querySelector('small');
      if (b && heading) b.textContent = heading;
      if (small && desc) small.textContent = desc;
    });

    if (button) button.textContent = '前往 Facebook 看更多教學紀錄 ↗';
    if (fallback) fallback.textContent = '更多課堂紀錄、作品與最新分享，歡迎前往 AI 教學觀察所 Facebook。';
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
})();
