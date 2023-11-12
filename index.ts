import 'dotenv/config'
import { getMarks } from './src/marks'
import { calcBonus } from './src/bonus'
import { printTable } from 'console-table-printer'

async function main(): Promise<void> {
  const students = JSON.parse(process.env.STUDENTS as string)

  for await (const student of students) {
    const marks = calcBonus(await getMarks(student.id))
    console.log(student.name)
    printTable(marks)
  }
}

void main()
