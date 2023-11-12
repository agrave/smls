import { type Lesson } from './marks'

export interface enrichedLesson extends Lesson {
  bonus: number
}
export function calcBonus(markedLessons: Lesson[]): enrichedLesson[] {
  return markedLessons.map((lesson) => {
    const { mark, comment } = lesson
    const fine = -50
    const bonus = 50
    let total = 0

    if (mark > 0 && mark <= 5) {
      total += fine
    } else if (mark === 10 || mark === 11) {
      total += bonus
    } else if (mark === 12) {
      total += bonus * 2
    }

    if (comment?.match(/без.*д.*з.*/i)) {
      total += fine
    }

    return { ...lesson, bonus: total }
  })
}
