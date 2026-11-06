"use client";
import { FileText, Info, MessageSquare, PhoneCall } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';

type myProps = {
    className?: string;
};

export default function SideNav({ className }: myProps) {
    const router = useRouter();
    return (
        <SidebarContent className={className}>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton className="cursor-pointer" tooltip="Chat" onClick={() => router.push('/')}>
                        <MessageSquare />
                        <span>Chat</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                    <SidebarMenuButton className="cursor-pointer" tooltip="Document" onClick={() => router.push('/document')}>
                        <FileText />
                        <span>Document ingested</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                    <SidebarMenuButton className="cursor-pointer" tooltip="About" onClick={() => router.push('/about')}>
                        <Info />
                        <span>About</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                    <SidebarMenuButton className="cursor-pointer" tooltip="Contact" onClick={() => router.push('/contact')}>
                        <PhoneCall />
                        <span>Contact</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarContent>
    )
}
