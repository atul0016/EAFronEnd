import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { ReactNode, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Textarea } from "../components/ui/textarea";
import {
  File,
  HardDrive,
  Trash,
  Clock,
  ReplyAll,
  Reply,
  Forward,
  Menu,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/store";
import { deleteEmail } from "Store/emailSlice";

interface MailProps {
  email: any;
  onDeleteEmail: (emailTitle: string) => void;
}
export function Mail({ email, onDeleteEmail }: MailProps) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    onDeleteEmail(email.title);
  };

  const [compact, setCompact] = useState(false);

  return (
    <div className="bg-gray-50">
      <Card className="h-[100vh] w-[90vw] lg:w-[45vw]">
        <CardHeader className="p-4 border-b border-gray-200">
          <div className=" flex justify-between  pr-4 mb-2 pb-2 pt-1 border-b ">
            <div className="flex">
              <a href="">
                <File className="h-4 mt-1" />
              </a>
              <HardDrive className="ml-2 pl-2 " />
              <p onClick={handleDelete}>
                <Trash className="ml-2 pl-2 " />
              </p>
              <Clock className="ml-2 pl-2 border-l" />
            </div>
            <div className="flex">
              <Reply className="h-4 mt-1" />
              <ReplyAll className="ml-2 pl-2 " />
              <Forward className="ml-2 pl-2 " />
              <Menu className="ml-2 pl-2 border-l" />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex ">
              <div className="rounded-full bg-gray-200 mr-6 p-2 pl-2.5 h-10 w-10">
                <h1 className="text-gray-600 ">
                  {email.name.charAt(0)}
                  {email.name.split(" ")[1]?.charAt(0)}
                </h1>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-800">
                  {email.name}
                </h2>
                <p className="text-sm text-gray-500">{email.title}</p>
                <p className="text-sm text-gray-400">{email.time}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400">{email.time}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 h-[50vw] sm:h-[60vh] text-sm text-gray-700">
          <p>{email.content}</p>
          <p className="mt-4">Best regards,</p>
          <p>{email.firstName}</p>
        </CardContent>
        <CardFooter className="p-4 border-t border-gray-200">
          <div className="">
            <Textarea
              placeholder={`Reply to ${email.name}...`}
              className="mb-4 rounded w-[43vw]"
            />
            <div className="flex justify-between ">
              <div className="flex items-center space-x-2">
                <Switch id="mute-thread" />
                <label htmlFor="mute-thread" className="text-sm text-gray-600">
                  Mute this thread
                </label>
              </div>
              <Button className="rounded-sm ml-[20vw] ">Send</Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
