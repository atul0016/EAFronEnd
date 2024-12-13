import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Search, Circle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { ReactNode, useState } from "react";
import { ScrollArea } from "../components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/store";

interface Email {
  title: string;
  name: string;
  time: string;
  content: string;
  firstName: string;
  tags: any;
  unread: boolean;
}

interface InboxProps {
  emailData: Email[];
  onSelectEmail: (email: Email) => void;
}

export function Inbox({ emailData, onSelectEmail }: InboxProps) {
  const [selectedTab, setSelectedTab] = useState("all");
  const filteredEmails =
    selectedTab === "all" ? emailData : emailData.filter((item) => item.unread);

  return (
    <div className="border-r ">
      <div className="pl-4 pr-4 mb-2 mt-1 pb-2 pt-1 w-[100vw] lg:w-[35vw] border-b">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className=" flex items-center justify-between space-x-4"
        >
          <h1 className="text-3xl font-bold">Inbox</h1>
          <TabsList>
            <TabsTrigger value="all">All mail</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="m-2 mr-2 relative w-[100vw] lg:w-[35vw]">
        {/* Search Bar */}
        <div className="absolute inset-y-0 left-3 flex items-center">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        <Input placeholder="Search..." className="pl-10" />
      </div>

      {/* Email List */}
      <ScrollArea className="h-[85.5vh] pr-4">
        <div>
          {filteredEmails.map((item) => (
            <Card
              key={item.title}
              className="w-[100vw] lg:w-[35vw] rounded-sm border p-4 m-2 cursor-pointer"
              onClick={() => onSelectEmail(item)}
            >
              <div className="flex items-center justify-between pb-2">
                <h3 className="flex text-sm font-medium text-gray-900">
                  {item.name}
                  {item.unread && <Circle className="h-[10px] mt-[6px]" />}
                </h3>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-700 line-clamp-2">
                  {item.content}
                </p>
                <div className="mt-1 flex gap-4">
                  {item.tags.map((itemtag: any) => {
                    if (itemtag === "work") {
                      return (
                        <span
                          key={itemtag}
                          className="rounded-sm bg-black px-3 py-0.5 text-xs font-bold text-white"
                        >
                          {itemtag}
                        </span>
                      );
                    }
                    return (
                      <span
                        key={itemtag}
                        className="rounded-sm bg-gray-200 px-3 py-1 text-xs font-bold text-gray-800"
                      >
                        {itemtag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
