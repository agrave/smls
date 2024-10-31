import 'dotenv/config'
import { program } from 'commander'
import { dateRange } from './src/date';
import { getMarks } from './src/marks'
import { calcBonus } from './src/bonus'
import { printTable } from 'console-table-printer'





void (async function (): Promise<void> {

  program
    .option('-w, --week', 'Marks for current week')
    .option('-m, --month', 'Marks for current month')
    .option('-d, --date <string>', 'Marks strating from date');

  program.parse();

  const options = program.opts();
  let dates: string[] = []

  switch (true) {
    case !!options.date:
      dates = dateRange(options.date)
      break;
    case options.month:
      dates = dateRange('month')
      break;
    case options.week:
      dates = dateRange('week')
      break;
    default:
      console.log('no options')

      break;
  }

  const students = JSON.parse(process.env.STUDENTS as string)

  for await (const student of students) {
    const marks = calcBonus(await getMarks(student.id, dates))
    console.log('\n', student.name)
    if (marks.length) {
      printTable(marks)
    } else {
      console.log('Ще немає оцінок за поточний період')
    }
  }
})()



