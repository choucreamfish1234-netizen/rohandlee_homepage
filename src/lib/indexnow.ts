// IndexNow — 새로 공개된 URL을 Bing·네이버 등 참여 검색엔진에 즉시 알린다.
// 키 파일은 public/{KEY}.txt 로 공개되어 있어야 한다.
export const INDEXNOW_KEY = 'c7721f6e924d7904b97fb1af9669fa71'
const HOST = 'lawfirmrohandlee.com'

export async function submitIndexNow(urls: string[]) {
  const urlList = Array.from(new Set(urls)).filter((u) => u.startsWith(`https://${HOST}/`)).slice(0, 10000)
  if (!urlList.length) return { submitted: 0, status: 0 }
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`, urlList }),
  })
  return { submitted: urlList.length, status: res.status }
}
