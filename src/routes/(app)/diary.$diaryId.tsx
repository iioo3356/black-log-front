import { createFileRoute, Link } from "@tanstack/react-router";
import clsx from "clsx";
import dayjs from "dayjs";
import type { ReactNode } from "react";

import { Form, Header } from "@/components";

import { diaries } from "../../mocks/diaries";

export const Route = createFileRoute("/(app)/diary/$diaryId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { diaryId } = Route.useParams();
  const diary = diaries.find((item) => item.id === diaryId);

  return (
    <div>
      <Header title="기록 조회" prefix="back" />
      {diary ? (
        <>
          <Form className="pb-[59px]">
            <ReadOnlyField label="날짜">
              {dayjs(diary.date).format("YYYY-MM-DD")}
            </ReadOnlyField>
            <ReadOnlyField label="제목">
              <div className="leading-[32px]">{diary.title}</div>
            </ReadOnlyField>
            <ReadOnlyField label="내용">
              <div className="min-h-[calc(100vh-(8*32px)-49px)] whitespace-pre-wrap leading-[32px]">
                {diary.content}
              </div>
            </ReadOnlyField>
          </Form>
          <Link
            to="/write"
            search={{ diaryId: diary.id }}
            className={clsx(
              "fixed bottom-0 mx-auto w-full max-w-lg",
              "bg-stone-500 hover:bg-stone-600 active:bg-stone-600",
              "p-[16px]",
              "text-center text-stone-100 text-[18px]",
            )}
          >
            수정하기
          </Link>
        </>
      ) : (
        <div className="px-[16px] py-[32px] text-center text-stone-500">
          등록된 기록을 찾을 수 없습니다.
        </div>
      )}
    </div>
  );
}

function ReadOnlyField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col px-[16px] leading-[32px] ">
      <div className="text-[12px] text-sky-900">{label}</div>
      <div className="text-stone-700 font-medium">{children}</div>
    </div>
  );
}
