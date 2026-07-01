import { createFileRoute, Link } from "@tanstack/react-router";
import clsx from "clsx";
import { Pencil, Search } from "lucide-react";

import { Button, Header, MonthCalendar } from "@/components";

export const Route = createFileRoute("/(app)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header
        title="달력"
        prefix={<Search />}
        suffix={
          <Link to="/write">
            <Pencil />
          </Link>
        }
      />
      <div className="relative pt-[16px] pb-[60px]">
        <MonthCalendar
          diaryList={{
            "2026-07-23": [
              { title: "개발 중 졸리다", date: "2026-07-23 09:12:00" },
              { title: "오짬 맛잇당", date: "2026-07-23 12:30:00" },
              {
                title: "날짜 누르면 모달 나오게 해야징",
                date: "2026-07-23 15:00:00",
              },
              { title: "4개까지만", date: "2026-07-23 18:20:00" },
              { title: "이건 숫자로 보이지롱", date: "2026-07-23 22:45:00" },
            ],
            "2026-01-20": [
              { title: "색 선택 기능 필요한가", date: "2026-01-20 10:00:00" },
            ],
          }}
        />
        <Link to="/write">
          <Button className={clsx(`fixed bottom-0 w-full max-w-lg`)}>
            기록하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
