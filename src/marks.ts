import axios from 'axios'
import { Md5 } from 'ts-md5'
import { dateRange } from './date'

export interface Lesson {
  date: string
  discipline: string
  mark: number
  comment?: string
}

export async function getMarks(studentId: string): Promise<Lesson[]> {
  const { LOGIN, PASSWORD } = process.env

  axios.defaults.headers.common.cookie = `PHPSESSID=${Md5.hashStr(
    new Date().toString(),
  )}`

  // authorize
  const aaa = await axios.post(
    'https://smls.com.ua/auth/attempt',
    {
      language: 'ua',
      username: LOGIN as string,
      password: PASSWORD as string,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        referer: 'https://smls.com.ua/',
        'x-requested-with': 'XMLHttpRequest',
      },
    },
  )

  const range = dateRange()
  const diaryByDate = (date: string): string =>
    `https://smls.com.ua/parent/diary/getDiaryByDate?date=${date}&user_id=${studentId}`

  const rawData = await Promise.all(
    range.map(async (date) => axios.get(diaryByDate(date))),
  )

  return (
    rawData
      .flatMap((response) => response.data.data)
      .filter(Boolean)
      .filter((lesson) => lesson.mark || lesson.teacher_comment)
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .map(({ mark, discipline_name, date, teacher_comment }) => ({
        date,
        discipline: discipline_name,
        mark: parseInt(mark) || 0,
        comment: teacher_comment,
      }))
  )
}
