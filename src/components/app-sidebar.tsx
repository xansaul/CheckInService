import * as React from "react"


import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router"
import { CalendarPlus2, Eye } from "lucide-react"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuSubItem>
                    <div className="flex gap-5 items-center">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                            <img src="/radiocucei.png"   />
                        </div>
                        <span className="font-bold">Radio CUCEI</span>
                    </div>
                </SidebarMenuSubItem>

            </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>                            
                            <SidebarMenuItem>
                                <SidebarMenuButton  asChild>
                                    <Link to="/">
                                        <CalendarPlus2 />
                                        <span>Registrarse</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton  asChild>
                                    <Link to="/history" >
                                        <Eye />
                                        <span>Ver historial</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

        </Sidebar>
    )
}
