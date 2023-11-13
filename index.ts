import 'dotenv/config'
import { getMarks } from './src/marks'
import { calcBonus } from './src/bonus'
import { printTable } from 'console-table-printer'

void (async function (): Promise<void> {
  const students = JSON.parse(process.env.STUDENTS as string)

  for await (const student of students) {
    const marks = calcBonus(await getMarks(student.id))
    console.log('\n', student.name)
    if (marks.length) {
      printTable(marks)
    } else {
      console.log('Ще немає оцінок за поточний період')
    }
  }
})()
