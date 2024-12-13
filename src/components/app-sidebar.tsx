import {
  Archive,
  Calendar,
  File,
  HardDrive,
  Cloud,
  Mail,
  Microchip,
  Home,
  Inbox,
  Search,
  Send,
  Settings,
  MoreHorizontal,
  Trash,
  Plus,
  ChevronDown,
  User,
  Users,
  Info,
  FormInput,
  CarTaxiFront,
  PanelsRightBottomIcon,
  User2,
  ChevronUp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarFooter,
  SidebarHeader,
} from "../components/ui/sidebar";
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import Authdata from "../services/authservice";
import { useNavigate } from "react-router-dom";
import userMail from "../services/otherService";
import { useEffect, useState } from "react";
const items = [
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
    number: 100,
  },
  {
    title: "Draft",
    url: "#",
    icon: File,
    number: 23,
  },
  {
    title: "Sent",
    url: "#",
    icon: Send,
    number: null,
  },
  {
    title: "Junk",
    url: "#",
    icon: HardDrive,
    number: 10,
  },
  {
    title: "Trash",
    url: "#",
    icon: Trash,
    number: null,
  },
  {
    title: "Archive",
    url: "#",
    icon: Archive,
    number: null,
  },
];
const itemsOther = [
  {
    title: "Social",
    url: "#",
    icon: Users,
    number: 26,
  },
  {
    title: "Updates",
    url: "#",
    icon: Info,
    number: 23,
  },
  {
    title: "Forums",
    url: "#",
    icon: FormInput,
    number: 45,
  },
  {
    title: "Shopping",
    url: "#",
    icon: CarTaxiFront,
    number: 15,
  },
  {
    title: "Promotions",
    url: "#",
    icon: PanelsRightBottomIcon,
    number: 20,
  },
];

const icon = { icon1: Cloud, icon2: Mail, icon3: Microchip };
export function AppSidebar() {
  const [email, setEmail] = useState("email");
  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await userMail();
      setEmail(email ?? ""); 
      console.log(email); 
    };

    fetchUserEmail(); 
  }, []);

  const logOut = () => {
    Authdata.logout();
    window.location.reload();
  };
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <SidebarMenuButton>
                  {email}
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <icon.icon1></icon.icon1>
                  <span>Acme_Inc@gmail.com</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <icon.icon2></icon.icon2>
                  <span>Acme_Corp@microsoft.com</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <icon.icon3></icon.icon3>
                  <span>Acme_Corp@hotmail.com</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="border-b">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem
                  key={item.title}
                  className={index === 0 ? "SelectedText" : ""}
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon
                        className={
                          index === 0
                            ? "mr-2 text-gray-600 SelectedText"
                            : "mr-2 text-gray-600"
                        }
                      />
                      <span className="font-semibold">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  <SidebarMenuBadge
                    className={
                      index === 0
                        ? "font-semibold rounded-full px-2 py-1 SelectedText"
                        : "font-semibold rounded-full px-2 py-1"
                    }
                  >
                    {item.number}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsOther.map((itemsOther) => (
                <SidebarMenuItem key={itemsOther.title}>
                  <SidebarMenuButton asChild>
                    <a href={itemsOther.url}>
                      <itemsOther.icon className="mr-2 text-gray-6" />
                      <span className="font-semibold">{itemsOther.title}</span>
                    </a>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="font-semibold rounded-full px-2 py-1">
                    {itemsOther.number}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {email}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logOut}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
