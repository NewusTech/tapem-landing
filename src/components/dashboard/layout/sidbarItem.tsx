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
  icon?: any;
};
export default function SidbarItem(props: SidbarItemProps) {
  const pathname = usePathname();
  const { dataItems, label, icon } = props;
  const [isOpen, setIsOpen] = useState(() =>
    dataItems.some((data) => data.link === pathname)
  );

  return (
    <Collapsible className="w-full" open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className={cn(
          "flex flex-row justify-start gap-x-4 text-primary-main items-center font-bold w-full px-4 py-4 duration-300 hover:bg-primary-soft/30 group",
          dataItems.some((data) => data.link === pathname) &&
            "bg-primary-soft/20"
        )}
      >
        <div className="group-hover:scale-125 duration-300">{icon}</div>
        <span className="mr-auto group-hover:translate-x-1 duration-300">{label}</span>
        {isOpen ? <ChevronDown /> : <ChevronUp />}
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-4 py-4 flex flex-col gap-2">
        {dataItems.map((data) => (
          <Link
            key={data.label}
            href={data.link}
            className={cn(
              "flex flex-row gap-x-4 text-primary-main items-center font-medium w-full px-4 py-4 hover:bg-primary-soft/30 hover:translate-x-1 duration-300",
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
