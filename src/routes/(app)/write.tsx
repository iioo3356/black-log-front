import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

import { Button, Field, Form, Header, Modal, TextArea } from "@/components";

import { diaries } from "../../mocks/diaries";

export const Route = createFileRoute("/(app)/write")({
  validateSearch: (search: Record<string, unknown>) => ({
    diaryId: typeof search.diaryId === "string" ? search.diaryId : undefined,
    date:
      typeof search.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(search.date)
        ? search.date
        : undefined,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { diaryId, date } = Route.useSearch();
  const diary = diaries.find((item) => item.id === diaryId);

  const form = useForm({
    defaultValues: {
      date: diary
        ? dayjs(diary.date).format("YYYY-MM-DD")
        : (date ?? dayjs().format("YYYY-MM-DD")),
      title: diary?.title ?? "",
      content: diary?.content ?? "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div>
      <Header title={diary ? "기록 수정" : "기록 작성"} prefix="back" />
      <Form className="pb-[59px]">
        <form.Field
          name="date"
          children={(field) => <DatePickerField field={field} />}
        />
        <form.Field
          name="title"
          children={(field) => (
            <Field label="제목" field={field}>
              <TextArea rows={1} placeholder="제목을 입력해 주세요." />
            </Field>
          )}
        />
        <form.Field
          name="content"
          children={(field) => (
            <Field label="내용" field={field}>
              <TextArea
                className="min-h-[calc(100vh-(8*32px)-49px)]"
                placeholder="내용을 작성해주세요."
              />
            </Field>
          )}
        />
      </Form>
      <Button
        onClick={form.handleSubmit}
        className={clsx(`fixed bottom-0 mx-auto w-full max-w-lg`)}
      >
        {diary ? "수정하기" : "기록하기"}
      </Button>
    </div>
  );
}

const DatePickerField = ({ field }: { field: AnyFieldApi }) => {
  const selectedDate = dayjs(field.state.value);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(
    selectedDate.isValid() ? selectedDate.startOf("month") : dayjs(),
  );

  const calendarWeeks = useMemo(() => {
    const startOfMonth = selectedMonth.startOf("month");
    const endOfMonth = selectedMonth.endOf("month");
    const calendarStart = startOfMonth.startOf("week");
    const calendarEnd = endOfMonth.endOf("week");

    const weeks = [];
    let current = calendarStart;

    while (!current.isAfter(calendarEnd, "day")) {
      const week = [];

      for (let i = 0; i < 7; i++) {
        week.push(current);
        current = current.add(1, "day");
      }

      weeks.push(week);
    }

    return weeks;
  }, [selectedMonth]);

  const handleOpen = () => {
    setSelectedMonth(
      selectedDate.isValid() ? selectedDate.startOf("month") : dayjs(),
    );
    setIsOpen(true);
  };

  const handleSelectDate = (date: dayjs.Dayjs) => {
    field.handleChange(date.format("YYYY-MM-DD"));
    field.handleBlur();
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col px-[16px]">
      <div className="text-[12px] leading-[32px] flex gap-[2px]">
        <label className="text-sky-900" htmlFor={field.name}>
          날짜
        </label>
      </div>
      <button
        id={field.name}
        name={field.name}
        type="button"
        className={clsx(
          "flex h-[32px] items-center justify-between py-[4px]",
          "text-left font-medium text-stone-700 outline-none",
        )}
        onClick={handleOpen}
      >
        <span>{field.state.value}</span>
        <CalendarDays size={18} className="text-stone-500" />
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="날짜 선택"
      >
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="rounded-[6px] p-[4px] text-stone-600 hover:bg-stone-200"
              onClick={() => setSelectedMonth(selectedMonth.add(-1, "month"))}
            >
              <ChevronLeft size={22} />
            </button>
            <div className="w-[120px] text-center text-[18px] font-bold text-stone-700">
              {selectedMonth.format("YYYY년 M월")}
            </div>
            <button
              type="button"
              className="rounded-[6px] p-[4px] text-stone-600 hover:bg-stone-200"
              onClick={() => setSelectedMonth(selectedMonth.add(1, "month"))}
            >
              <ChevronRight size={22} />
            </button>
          </div>
          <div className="grid grid-cols-7 text-center text-[12px] font-medium">
            <div className="text-red-600">일</div>
            <div>월</div>
            <div>화</div>
            <div>수</div>
            <div>목</div>
            <div>금</div>
            <div className="text-blue-600">토</div>
          </div>
          <div className="grid grid-cols-7 gap-[4px]">
            {calendarWeeks.flat().map((date) => {
              const formattedDate = date.format("YYYY-MM-DD");
              const isSelected = formattedDate === field.state.value;
              const isCurrentMonth = date.isSame(selectedMonth, "month");
              const isToday = date.isSame(dayjs(), "day");

              return (
                <button
                  key={formattedDate}
                  type="button"
                  className={clsx(
                    "aspect-square rounded-[6px] text-[14px] font-medium",
                    "hover:bg-stone-200",
                    !isCurrentMonth && "text-stone-400",
                    date.day() === 0 && !isSelected && "text-red-600",
                    date.day() === 6 && !isSelected && "text-blue-600",
                    isToday && !isSelected && "ring-1 ring-stone-400",
                    isSelected && "bg-stone-600 text-stone-100",
                  )}
                  onClick={() => handleSelectDate(date)}
                >
                  {date.date()}
                </button>
              );
            })}
          </div>
          <Button
            type="button"
            className="rounded-[8px]"
            onClick={() => handleSelectDate(dayjs())}
          >
            오늘 선택
          </Button>
        </div>
      </Modal>
    </div>
  );
};
