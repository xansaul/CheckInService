import * as React from "react"


import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Radio CUCEI</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>                            
                            <SidebarMenuItem>
                                <SidebarMenuButton  asChild>
                                    <Link to="/">
                                        <span>Registrarse</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton  asChild>
                                    <Link to="/history" >
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
