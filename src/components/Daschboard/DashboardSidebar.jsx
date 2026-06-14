

import { getUserSession } from "@/lib/core/session";
import { Bars, Bell, Envelope, Gear, House, LayoutSideContentRight, Briefcase, Person, Plus, Factory } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Bookmark, Building, CreditCard, FileText, LayoutGrid, Search, User } from "lucide-react";
import Link from "next/link";

export async function DashboardSidebar() {

    const user = await getUserSession();
    const recruiterNavLinks = [
        { icon: House, href: "/dashboard/recruiter", label: "Home" },
        { icon: Briefcase, href: "/dashboard/recruiter/jobs", label: "Jobs" },
        { icon: Plus, href: "/dashboard/recruiter/jobs/new", label: "Post A Job" },
        { icon: Factory, href: "/dashboard/recruiter/company", label: "Company Profile" },
        { icon: Envelope, href: "/messages", label: "Messages" },
        { icon: Person, href: "/profile", label: "Profile" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ]
    const seekerNavLinks = [
        { icon: LayoutGrid, href: "/dashboard/seeker", label: "Dashboard" },
        { icon: Search, href: "/dashboard/seeker/jobs", label: "Jobs" },
        { icon: Bookmark, href: "/dashboard/seeker/saved", label: "Saved Jobs" },
        { icon: FileText, href: "/dashboard/seeker/applications", label: "Applications" },
        { icon: CreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ];
    const adminNavLinks = [
        { icon: LayoutGrid, href: "/dashboard/admin", label: "Dashboard" },
        { icon: User, href: "/dashboard/admin/users", label: "Users" },
        { icon: Building, href: "/dashboard/admin/companies", label: "Companies" },
        { icon: Briefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
        { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
        { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
    ];

    const navLinksMap = {
        seeker: seekerNavLinks,
        recruiter: recruiterNavLinks,
        admin: adminNavLinks
    }

    const navItems = navLinksMap[user?.role];

    const navContent = <nav className="flex flex-col gap-1">
        {navItems?.map((item) => (
            <Link key={item.label} href={item.href}>

                <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default w-full"
                    type="button"
                >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                </button>
            </Link>
        ))}
    </nav>

    return (
        <>

            <aside className="hidden w-64 shrink-0 border-r border-default p-4 md:block">
                {navContent}
            </aside>
            <Drawer>
                <Button className={"lg:hidden"} variant="secondary">
                    <LayoutSideContentRight />
                    Sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}