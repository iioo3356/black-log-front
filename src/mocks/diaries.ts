export interface Diary {
  id: string;
  date: string;
  title: string;
  content: string;
}

export const diaries: Diary[] = [
  {
    id: "1",
    title: "개발 중 졸리다",
    date: "2026-07-23 09:12:00",
    content:
      "오전부터 화면 구조를 정리했다. 졸리긴 했지만 작은 컴포넌트부터 맞춰가니까 조금씩 형태가 보인다.",
  },
  {
    id: "2",
    title: "오짬 맛잇당",
    date: "2026-07-23 12:30:00",
    content:
      "점심으로 오짬을 먹었다. 매콤해서 정신이 번쩍 들었다. 다음에는 밥도 같이 먹어야지.",
  },
  {
    id: "3",
    title: "날짜 누르면 모달 나오게 해야징",
    date: "2026-07-23 15:00:00",
    content:
      "달력 날짜를 눌렀을 때 그날 작성한 기록이 모달로 나오면 탐색 흐름이 훨씬 자연스러울 것 같다.",
  },
  {
    id: "4",
    title: "4개까지만",
    date: "2026-07-23 18:20:00",
    content:
      "달력 칸 안에는 기록을 전부 보여주면 너무 복잡하다. 네 개까지만 보여주고 나머지는 숫자로 표현하기.",
  },
  {
    id: "5",
    title: "이건 숫자로 보이지롱",
    date: "2026-07-23 22:45:00",
    content:
      "다섯 번째 기록은 달력에서 +1로 보인다. 모달에서는 전체 목록을 볼 수 있게 연결하면 된다.",
  },
  {
    id: "6",
    title: "색 선택 기능 필요한가",
    date: "2026-01-20 10:00:00",
    content:
      "기록마다 색을 고르게 하면 예쁘긴 한데, 먼저 조회와 수정 흐름을 단단하게 만드는 게 우선이다.",
  },
];

export const diaryListByDate = diaries.reduce<Record<string, Diary[]>>(
  (acc, diary) => {
    const date = diary.date.slice(0, 10);
    acc[date] = [...(acc[date] ?? []), diary];
    return acc;
  },
  {},
);
