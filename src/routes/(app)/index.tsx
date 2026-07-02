import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import clsx from "clsx";
import dayjs from "dayjs";
import { Pencil, Search } from "lucide-react";

import { Button, Header, MonthCalendar } from "@/components";

import { diaryListByDate } from "../../mocks/diaries";

type CalendarSearch = {
  month?: string;
  openDate?: string;
};

export const Route = createFileRoute("/(app)/")({
  validateSearch: (search: Record<string, unknown>) => ({
    month: typeof search.month === "string" ? search.month : undefined,
    openDate:
      typeof search.openDate === "string" ? search.openDate : undefined,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { month, openDate } = Route.useSearch();
  const selectedMonth =
    month && /^\d{4}-\d{2}$/.test(month) ? dayjs(`${month}-01`) : dayjs();

  const updateCalendarSearch = (next: CalendarSearch) => {
    navigate({
      search: (prev: CalendarSearch) => ({
        ...prev,
        ...next,
      }),
      replace: true,
    });
  };

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
          diaryList={diaryListByDate}
          selectedMonth={selectedMonth}
          openDate={openDate}
          onSelectedMonthChange={(nextMonth) =>
            updateCalendarSearch({
              month: nextMonth.format("YYYY-MM"),
              openDate: undefined,
            })
          }
          onOpenDateChange={(nextOpenDate) =>
            updateCalendarSearch({
              month: nextOpenDate
                ? dayjs(nextOpenDate).format("YYYY-MM")
                : selectedMonth.format("YYYY-MM"),
              openDate: nextOpenDate,
            })
          }
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
