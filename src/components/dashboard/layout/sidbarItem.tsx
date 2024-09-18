import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

type SidbarItemProps = {
  dataItems: {
    label: string;
    link: string;
  }[];
  label: string;
};
export default function SidbarItem(props: SidbarItemProps) {
  const { dataItems, label } = props;
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Collapsible className="w-full" open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className={cn(
          "flex flex-row justify-between gap-x-4 text-primary-main items-center font-bold w-full px-4 py-4",
          dataItems.some((data) => data.link === pathname) &&
            "bg-primary-soft/20"
        )}
      >
        {label}
        {isOpen ? <ChevronDown /> : <ChevronUp />}
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-4 py-4 flex flex-col gap-2">
        {dataItems.map((data) => (
          <Link
            key={data.label}
            href={data.link}
            className={cn(
              "flex flex-row gap-x-4 text-primary-main items-center font-medium w-full px-4 py-4",
              pathname === data.link && "bg-primary-soft/20"
            )}
          >
            {data.label}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
