import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import dayjs from "dayjs";
import { BookOpen } from "lucide-react";

import { Modal } from "@/components/Modal";

export interface DiaryPreview {
  id: string;
  title: string;
  date: string; // "YYYY-MM-DD HH:mm:ss"
}

interface DateProps {
  day: dayjs.Dayjs;
  diaryList?: DiaryPreview[] | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export const CalendarDate = ({
  day,
  diaryList,
  isOpen,
  onOpenChange,
}: DateProps) => {
  return (
    <div
      className={clsx(
        "w-full h-[120px] flex flex-col  border-r border-stone-300 first:border-l text-center",
      )}
    >
      <div
        className={clsx(
          "text-[12px]",
          day.month() === day.month() ? "font-bold" : "font-light",
          day.day() === 0
            ? "text-red-600"
            : day.day() === 6
              ? "text-blue-600"
              : "text-black",
        )}
      >
        {day.date()}
      </div>
      <button
        className={clsx(
          "h-full cursor-pointer hover:bg-stone-200/50",
          "flex flex-col gap-[2px]",
        )}
        onClick={() => onOpenChange(true)}
      >
        {diaryList?.slice(0, 4)?.map((diary, index) => (
          <div
            key={index}
            className={clsx(
              index % 2 === 0 ? "bg-stone-200" : "bg-stone-300",
              "text-[13px] pl-[2px] text-left line-clamp-1",
            )}
          >
            {diary.title}
          </div>
        ))}
        {(diaryList?.length || 0) > 4 && (
          <div className="text-[12px] text-right">
            +{(diaryList?.length || 0) - 4}
          </div>
        )}
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => onOpenChange(false)}
        title={day.format("YYYY.MM.DD")}
      >
        <div className="flex flex-col gap-[8px]">
          {diaryList?.length ? (
            diaryList.map((diary, index) => (
              <Link
                key={index}
                to="/diary/$diaryId"
                params={{ diaryId: diary.id }}
                className={clsx(
                  "flex justify-between gap-[8px] text-[14px]",
                  "rounded-[8px] px-[12px] py-[8px] cursor-pointer",
                  index % 2 === 0
                    ? "bg-stone-200 hover:bg-stone-300"
                    : "bg-stone-300 hover:bg-stone-400",
                )}
              >
                <span className="line-clamp-1 text-left">{diary.title}</span>
                <span className="shrink-0 text-stone-500">
                  {dayjs(diary.date).format("HH:mm:ss")}
                </span>
              </Link>
            ))
          ) : (
            <div
              className={clsx(
                "flex flex-col items-center gap-[8px]",
                "rounded-[8px] bg-stone-200/70 px-[16px] py-[24px]",
                "text-center text-stone-500",
              )}
            >
              <div className="rounded-full bg-stone-100 p-[10px] text-stone-400">
                <BookOpen size={28} strokeWidth={1.8} />
              </div>
              <div>
                <div className="text-[14px] font-medium text-stone-600">
                  작성된 기록이 없습니다.
                </div>
                <div className="mt-[2px] text-[12px]">
                  오늘의 순간을 남겨보세요.
                </div>
              </div>
            </div>
          )}
          <Link
            to="/write"
            search={{ date: day.format("YYYY-MM-DD") }}
            className={clsx(
              "rounded-[8px] bg-stone-500 px-[12px] py-[10px]",
              "text-center text-[14px] text-stone-100",
              "hover:bg-stone-600 active:bg-stone-600",
            )}
          >
            이 날짜에 기록하기
          </Link>
        </div>
      </Modal>
    </div>
  );
};
